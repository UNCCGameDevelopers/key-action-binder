﻿/// <reference path="KeyboardBinding.ts" />
/// <reference path="GamepadBinding.ts" />

module KAB {
	/**
	 * Information linking an action to a binding, and whether it's activated
	 */
	export class Action {

		// Properties
		private _id:string;
		private _lastActivatedTime:number;

		private _keyboardBindings:Array<KeyboardBinding>;
		private _gamepadBindings:Array<GamepadBinding>;

		private _activated:boolean;
		private _value:number;


		// ================================================================================================================
		// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

		constructor(id:string) {
			this._id = id;
			this._lastActivatedTime = 0;

			this._keyboardBindings = new Array<KeyboardBinding>();
			this._gamepadBindings = new Array<GamepadBinding>();

			this._activated = false;
			this._value = 0;
		}


		// ================================================================================================================
		// PUBLIC INTERFACE -----------------------------------------------------------------------------------------------

		public addKeyboardBinding(keyCode:number = KeyActionBinder.KEY_CODE_ANY, keyLocation:number = KeyActionBinder.KEY_LOCATION_ANY):void {
			// TODO: check if already present?
			this._keyboardBindings.push(new KeyboardBinding(keyCode, keyLocation));
		}

		public addGamepadBinding():void {
			console.error("Action.addKeyboardBinding() not implemented yet");
		}

		public consume():void {
			console.error("Action.consume() not implemented yet");
		}

		public interpretKeyDown(keyCode:number, keyLocation:number):void {
			console.error("Action.interpretKeyDown() not implemented yet");
		}

		public interpretKeyUp(keyCode:number, keyLocation:number):void {
			console.error("Action.interpretKeyUp() not implemented yet");
		}


		// ================================================================================================================
		// ACCESSOR INTERFACE ---------------------------------------------------------------------------------------------

		public get id():string {
			return this._id;
		}

		public get activated():boolean {
			return this._activated;
		}

		public get value():number {
			return this._value;
		}
	}
}