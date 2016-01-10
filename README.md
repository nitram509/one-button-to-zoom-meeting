
# One Button To Zoom-Meeting

This little one-button-solution is connected to a Mac-Mini
and initiates a [Zoom](http://zoom.us) meeting automatically, once the button is pressed.
After initiating a new meeting, all attendees will be notified via Skype.
The notification contains the join-URL so that's easy possible to join by just one click.
The list of attendees can be easily configured via Skype contact lists.
There's also a LED inside, which gives visual feedback
and of course – like any other DIY project – there needs to be a LED soldered in ;)

![cicuit diagram](/pictures/button_box_assembled.jpg?raw=true)


##### License

[![License](https://img.shields.io/:license-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)


### How does it work?

The idea is simple, we use a really cheap micro controller
and a fancy button (from an arcade mashine) and simulate an USB keyboard.
This simulated Keyboard doesn't need any special software driver
because all operating systems automatically have drivers included and can use it.

When the button is pressed it will signal the operating system:
"there was a button pressed".
Which button to use, can be configured inside this micro controller code.

Another software tool (e.g. [Automator](http://www.apple.com/en/osx/all-features/#automation))
is used to detect a button-press similar to a user
pressing a special hot key and triggers a script which finally starts the Zoom client.


### Arduino firmware & How to build

* Use Arduino IDE 1.6.5 or newer
* Follow the [Digispark's tutorial](http://digistump.com/wiki/digispark/tutorials/connecting)
* Compile the file ```one-button-to-zoom-meeting.ino``` and upload the code from within your Arduino IDE


### OSX Software

There's a script file ```start_meeting_and_notify_users.js``` that uses Apple's
[JavaScript for Automation](https://developer.apple.com/library/mac/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/Introduction.html)
technique to automatically initiate a meeting and notify all attendees.

Before running this script, make sure Skype and Zoom have login credentials
provided and are able to login automatically. Currently the script is not able
to handle authentication of Skype nor Zoom.


#### Requirements

The following software needs to be installed in order to make the 'magic' happen

* OSX 10.x
   * Curl - command line tool for [Zoom's REST API integration](https://support.zoom.us/hc/en-us/sections/200305463-API)
   * Osascript  - command line tool for Skype desktop API integration
   * Automator - for global hot key binding
* Zoom.us dekstop client
* Skype desktop client


#### How to run?

In general you have many options to run this script.

1. Run manually from within a terminal
2. Run programatically by any other script
3. Triggered by OSX Automator tool


##### Automator script - Or how to use green button?

To trigger the script by a global hotkey (a.k.a. green button),
you need to copy the script inside Automator's service script.
Afterwards you can assign a key to this service script.

##### 1. Start Automator
   * create a new workflow document of type 'Service'
   * set 'Service receives selected' to 'no input'
   * add 'Run JavaScript' from the Library into your workflow document
   * copy all code from file ```start_meeting_and_notify_users.js``` to clipboard
   * replace '// Your script goes here' inside workflow script and paste the code from clipboard
   * remove the first line '#!/usr/bin/env osascript -l JavaScript'
   * save workflow document as 'one-button-to-zoom' into your user's folder ~/Library/Services

![automator service javascript](/pictures/automator_service_javascript.png?raw=true)

##### 2. Start Keyboard (from System Preferences)
   * select 'Shortcuts'
   * select 'Services'
   * search for General -> one-button-to-zoom
   * assign a new key == the green button one ;)

![keyboard bindings for service script](/pictures/keyboard_bindings_for_service_script.png?raw=true)


### Hardware

Designed to be used with [Digispark](http://digistump.com/products/1) ATTiny85 boards.


#### Circuit diagram

![cicuit diagram](/one-button-to-zoom_Schaltplan.png?raw=true)


##### Part list

* 1x Digispark (or compatible)
* 1x Arcade Button, 52mm, incl. 1 LED
* 1x Resistor 220Ohm
* 1x Resistor 10kOhm
