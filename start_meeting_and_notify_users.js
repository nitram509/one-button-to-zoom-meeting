#!/usr/bin/env osascript -l JavaScript

//
// ***** configure your settings here *****
var zoomApiKey = '<YPUR API KEY HERE>'
var zoomApiSecret = '<YOUR API SECRET HERE>'
var meetingTopicPrefix = 'Instant Meeting'
// *****************DONE*******************
//

function doShellScript (command) {
  var app = Application.currentApplication(command)
  app.includeStandardAdditions = true
  return app.doShellScript(command)
}

function doShellScriptAndParseResult (command) {
  var responseStr = doShellScript(command)
  if (responseStr.startsWith('{')) {
    return JSON.parse(responseStr)
  }
  throw new Error(
      'Error while executing a script.\n' +
      'Command: ' + command + ' \n' +
      'Result: \n' + responseStr)
}

function zoomGetUserList () {
  var curlCommand = 'curl -XPOST '
  curlCommand += '--data "'
  curlCommand += 'api_key=' + encodeURI(zoomApiKey)
  curlCommand += '&api_secret=' + encodeURI(zoomApiSecret)
  curlCommand += '&data_type=JSON'
  curlCommand += '" '
  curlCommand += 'https://api.zoom.us/v1/user/list'
  return doShellScriptAndParseResult(curlCommand)
}

function zoomCreateMeeting (userId, topic) {
  var curlCommand = 'curl -XPOST '
  curlCommand += '--data "'
  curlCommand += 'api_key=' + encodeURI(zoomApiKey)
  curlCommand += '&api_secret=' + encodeURI(zoomApiSecret)
  curlCommand += '&data_type=JSON'
  curlCommand += '&host_id=' + encodeURI(userId)
  curlCommand += '&topic=' + encodeURI(topic)
  curlCommand += '&type=1'
  curlCommand += '" '
  curlCommand += 'https://api.zoom.us/v1/meeting/create'
  return doShellScriptAndParseResult(curlCommand)
}

function killRunningZoomApp () {
  var command = 'pkill zoom.us'
  try {
    doShellScript(command)
  } catch (e) {
    // ignore
  }
}

function startMeetingLocally (meetingId, userId, userName) {
    // "zoommtg://zoom.us/start?confno=622266174&zc=0&uname=foobar&uid=SmX7qrWcQyu3QhjPS-D1jg"
  var command = 'open  "zoommtg://zoom.us/start?'
  command += 'confno=' + encodeURI(meetingId)
  command += '&uid=' + encodeURI(userId)
  command += '&uname=' + encodeURI(userName)
  command += '&zc=0'
  command += '"'
  return doShellScript(command)
}

function getAllSkypeUsers () {
  var command = 'osascript -e \'tell application "Skype" to send command "SEARCH FRIENDS" script name "skype_messages.scpt"\''
  var skypeUsers = doShellScript(command)
  if (skypeUsers.startsWith('USERS')) {
    return skypeUsers.replace('USERS ', '').split(', ')
  }
  console.log('# WARN: Couldn\'t fetch user list from Skype.')
  return []
}

function hasSkypeUserToBeNotified (skypeUser) {
  var command = 'osascript -e \'tell application "Skype" to send command "GET USER ' + skypeUser + ' DISPLAYNAME" script name "skype_messages.scpt"\''
  var displayName = doShellScript(command)
  return displayName.indexOf('(notify on meeting created)') >= 0
}

function sendSkypeMessage (skypeUser, message) {
  var command = 'osascript -e \'tell application "Skype" to send command "MESSAGE " & "' + skypeUser + '" & space & "' + message + '" script name "skype_messages.scpt"\''
  return doShellScript(command)
}

var userList = zoomGetUserList()
var user = userList.users[0]
var userName = user.first_name + ' ' + user.last_name
var meetingTopic = meetingTopicPrefix + ' - ' + new Date().toDateString()
var meeting = zoomCreateMeeting(user.id, meetingTopic)

console.log('# Kill existing zoom apps to avoid double login problems ...')
killRunningZoomApp()
console.log('# Done.')

console.log('# Starting meeting ...')
console.log('### id        : ' + meeting.id)
console.log('### user name : ' + userName)
console.log('### topic     : ' + meetingTopic)
console.log('### join URL  : ' + meeting.join_url)
startMeetingLocally(meeting.id, user.id, userName)
console.log('# Meeting start initiated.')

console.log('# Searching for Skype users to be notified ...')
var skypeUsersToBeNotified = getAllSkypeUsers()
skypeUsersToBeNotified = skypeUsersToBeNotified.filter(hasSkypeUserToBeNotified)
console.log('### notify users : ' + skypeUsersToBeNotified.join(', '))
for (var i = 0; i < skypeUsersToBeNotified.length; i++) {
  sendSkypeMessage(skypeUsersToBeNotified[i], 'The green button was pressed and Zoom meeting has started. \n ' + meeting.join_url)
}
