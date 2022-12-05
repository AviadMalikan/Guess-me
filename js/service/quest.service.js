'use strict'

const STORAGE_KEY = "questDB"

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY)
  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
  }
  gCurrQuest = gQuestsTree
  gPrevQuest = null
  _saveQuestsToStorage()
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function getLastRes() {
  return gPrevQuest
}

function moveToNextQuest(res) {
  console.log('res on move: ', res)
  // update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {

  console.log('lastRes: ', lastRes)
  
  // var newQuest = createQuest(newQuestTxt)
  // newQuest[lastRes] = gCurrQuest
  // newQuest.yes = createQuest(newGuessTxt)
  // gPrevQuest.yes = newQuest
  // gCurrQuest = gQuestsTree
  console.log('gCurrQuest: ', gCurrQuest)
  console.log('gPrevQuest: ', gPrevQuest)


  var newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest

  gPrevQuest[lastRes] = newQuest

  _saveQuestsToStorage()
}

function getCurrQuest() {
  return gCurrQuest
}

function _saveQuestsToStorage() {
  console.log('gQuestsTree: ', gQuestsTree)

  saveToStorage(STORAGE_KEY, gQuestsTree)
}