﻿/// <reference path="KeyboardBinding.ts" />
/// <reference path="GamepadButtonBinding.ts" />

module KAB {
	/**
	 * Information linking an action to a binding, and whether it's activated
	 */
	export class Action {

		// Properties
		private _id:string;
		private _lastActivatedTime:number;

		private keyboardBindings:Array<KeyboardBinding>;
		private keyboardActivated:boolean;
		private keyboardValue:number;

		private gamepadButtonBindings:Array<GamepadButtonBinding>;
		private gamepadButtonActivated:boolean;
		private gamepadButtonValue:number;

		private consumed:boolean;


		// ================================================================================================================
		// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

		constructor(id:string) {
			this._id = id;
			this._lastActivatedTime = 0;

			this.keyboardBindings = [];
			this.keyboardActivated = false;
			this.keyboardValue = 0;

			this.gamepadButtonBindings = [];
			this.gamepadButtonActivated = false;
			this.gamepadButtonValue = 0;

			this.consumed = false;
		}


		// ================================================================================================================
		// PUBLIC INTERFACE -----------------------------------------------------------------------------------------------

		public addKeyboardBinding(keyCode:number = KeyActionBinder.KeyCodes.ANY, keyLocation:number = KeyActionBinder.KeyLocations.ANY):void {
			// TODO: check if already present?
			this.keyboardBindings.push(new KeyboardBinding(keyCode, keyLocation));
		}

		public addGamepadButtonBinding(buttonCode:number = KeyActionBinder.GamepadButtons.ANY, gamepadLocation:number = KeyActionBinder.GamepadLocations.ANY):void {
			// TODO: check if already present?
			this.gamepadButtonBindings.push(new GamepadButtonBinding(buttonCode, gamepadLocation));
		}

		public addGamepadBinding():void {
			console.error("Action.addGamepadBinding() not implemented yet");
		}

		public consume():void {
			if (this.activated) this.consumed = true;
		}

		public interpretKeyDown(keyCode:number, keyLocation:number):void {
			for (var i:number = 0; i < this.keyboardBindings.length; i++) {
				if (!this.keyboardBindings[i].isActivated && this.keyboardBindings[i].matchesKeyboardKey(keyCode, keyLocation)) {
					// Activated
					this.keyboardBindings[i].isActivated = true;
					this.keyboardActivated = true;
					this.keyboardValue = 1;
				}
			}
		}

		public interpretKeyUp(keyCode:number, keyLocation:number):void {
			var hasMatch:boolean;
			var isActivated:boolean = false;
			for (var i:number = 0; i < this.keyboardBindings.length; i++) {
				if (this.keyboardBindings[i].matchesKeyboardKey(keyCode, keyLocation)) {
					if (this.keyboardBindings[i].isActivated) {
						// Deactivated
						this.keyboardBindings[i].isActivated = false;
					}
					hasMatch = true;
					isActivated = isActivated || this.keyboardBindings[i].isActivated;
				}
			}

			if (hasMatch) {
				this.keyboardActivated = isActivated;
				this.keyboardValue = this.keyboardActivated ? 1 : 0;

				if (this.keyboardActivated) this.consumed = false;
			}
		}

		public interpretGamepadButton(buttonCode:number, gamepadLocation:number, pressedState:boolean, valueState:number):void {
			var hasMatch:boolean;
			var isActivated:boolean = false;
			var newValue:number = 0;
			for (var i:number = 0; i < this.gamepadButtonBindings.length; i++) {
				if (this.gamepadButtonBindings[i].matchesGamepadButton(buttonCode, gamepadLocation)) {
					hasMatch = true;
					this.gamepadButtonBindings[i].isActivated = pressedState;
					this.gamepadButtonBindings[i].value = valueState;

					isActivated = isActivated || pressedState;
					if (valueState > newValue) newValue = valueState;
				}
			}

			if (hasMatch) {
				this.gamepadButtonActivated = isActivated;
				this.gamepadButtonValue = newValue;

				if (this.gamepadButtonActivated) this.consumed = false;
			}
		}


		// ================================================================================================================
		// ACCESSOR INTERFACE ---------------------------------------------------------------------------------------------

		public get id():string {
			return this._id;
		}

		public get activated():boolean {
			return (this.keyboardActivated || this.gamepadButtonActivated) && !this.consumed;
		}

		public get value():number {
			return Math.max(this.keyboardValue, this.gamepadButtonValue);
		}
	}
}
