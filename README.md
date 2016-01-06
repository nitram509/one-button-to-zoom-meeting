
# One Button To Zoom-Meeting

This little one-button-solution is connected to a Mac-Mini
and initiates a [Zoom](http://zoom.us) meeting automatically, once pressed.
There's also a LED inside, which gives visual feedback
and of course - like any other DIY project there needs to be a LED soldered ;)

![cicuit diagram](/pictures/button_box_assembled.jpg?raw=true)

### How does it work?

The idea is simple, we use a really cheap micro controller
and a fancy button (from an arcade mashine) and simulate an USB keyboard.
This simulated Keyboard doesn't need any special software driver
because all operating systems automatically have drivers included and can use it.

When the button is pressed it will signal the operating system:
"there was a button pressed"
Which button to use, can be configured inside this micro controller code.

Another software tool is used to detect a button-press similar to a user
pressing a special hot key and triggers a script which finally starts the Zoom client.


### Software & How to build

* Use Arduino IDE 1.6.5 or newer
* Follow the [Digispark's tutorial](http://digistump.com/wiki/digispark/tutorials/connecting)
* Compile and upload this code from within your Arduino IDE

##### License

[![License](https://img.shields.io/:license-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)


### Hardware

Designed to be used with [Digispark](http://digistump.com/products/1) ATTiny85 boards.


#### Circuit diagram

![cicuit diagram](/one-button-to-zoom_Schaltplan.png?raw=true)


##### Part list

* 1x Digispark (or compatible)
* 1x Arcade Button, 52mm, incl. 1 LED
* 1x Resistor 220Ohm
* 1x Resistor 10kOhm
