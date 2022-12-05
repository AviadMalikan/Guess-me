'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-success').click({ ans: 'yes' }, onUserResponse)
$('.btn-danger').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  // hide the game-start section
  $('.game-start').hide()
  $('.winner').hide()
  renderQuest()
  // show the quest section
  $('.quest').show()
}

function renderQuest() {
  // select the <h2> inside quest and update
  // its text by the currQuest text
  const quest = getCurrQuest()
  $('.quest h2').text(quest.txt)
}

function onUserResponse(ev) {
  // console.log('ev', ev)
  var res = ev.data.ans
  const quest = getCurrQuest()

  // If this node has no children
  if (isChildless(quest)) {
    if (res === 'yes') {
      $('.quest').hide()

      $('.winner').show()
      $('.winner h1').text(`I knew it was ${quest.txt},
      do you want to try me again ?`)
      onRestartGame()
    } else {
      alert(`I don't know...teach me!`)
      // hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // update the lastRes global var
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()
  // console.log('newGuess: ', newGuess)
  // console.log('newQuest: ', newQuest)

  // Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)

  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  gLastRes = null
  init()
}
