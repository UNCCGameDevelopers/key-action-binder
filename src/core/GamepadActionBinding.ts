﻿/// <reference path="KeyActionBinder.ts" />

module KAB {
	/**
	 * Information on a gamepad event filter
	 */
	export class GamepadActionBinding {

		// Properties
		public buttonCode:number;
		public gamepadLocation:number;

		public isActivated:boolean;
		public value:number;


		// ================================================================================================================
		// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

		constructor(buttonCode:number, gamepadLocation:number) {
			this.buttonCode = buttonCode;
			this.gamepadLocation = gamepadLocation;
			this.isActivated = false;
			this.value = 0;
		}

		// ================================================================================================================
		// PUBLIC INTERFACE -----------------------------------------------------------------------------------------------

		public matchesGamepadButton(buttonCode:number, gamepadLocation:number):boolean {
			return (this.buttonCode == buttonCode || this.buttonCode == KeyActionBinder.GamepadButtons.ANY) && (this.gamepadLocation == gamepadLocation || this.gamepadLocation == KeyActionBinder.GamepadLocations.ANY);
		}
	}
}