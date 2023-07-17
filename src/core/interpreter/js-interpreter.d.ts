/**
 * @license
 * JavaScript Interpreter
 *
 * Copyright 2013 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Interpreting JavaScript in JavaScript.
 * @author fraser@google.com (Neil Fraser)
 */

// Source: https://github.com/NeilFraser/JS-Interpreter/pull/49/files

declare class Interpreter {
    /**
     * Create a new interpreter.
     * @param {string} code Raw JavaScript text.
     * @param {Function} opt_initFunc Optional initialization function.  Used to
     *     define APIs.  When called it is passed the interpreter object and the
     *     global scope object.
     * @constructor
     */
    constructor(code: string, opt_initFunc);

    public OBJECT : Object;

    /**
     * Execute one step of the interpreter.
     * @return {boolean} True if a step was executed, false if no more instructions.
     */
    public step(): boolean;

    /**
     * Execute the interpreter to program completion.
     */
    public run(): void;

    /**
     * Initialize the global scope with buitin properties and functions.
     * @param {!Object} scope Global scope.
     */
    public initGlobalScope(scope): void;

    /**
     * Initialize the Function class.
     * @param {!Object} scope Global scope.
     */
    public initFunction(scope): void;

    /**
     * Initialize the Object class.
     * @param {!Object} scope Global scope.
     */
    public initObject(scope): void;

    /**
     * Initialize the Array class.
     * @param {!Object} scope Global scope.
     */
    public initArray(scope): void;

    /**
     * Initialize the Number class.
     * @param {!Object} scope Global scope.
     */
    public initNumber(scope): void;

    /**
     * Initialize the String class.
     * @param {!Object} scope Global scope.
     */
    public initString(scope): void;

    /**
     * Initialize the Boolean class.
     * @param {!Object} scope Global scope.
     */
    public initBoolean(scope): void;

    /**
     * Initialize the Date class.
     * @param {!Object} scope Global scope.
     */
    public initDate(scope): void;

    /**
     * Initialize Math object.
     * @param {!Object} scope Global scope.
     */
    public initMath(scope): void;

    /**
     * Initialize Regular Expression object.
     * @param {!Object} scope Global scope.
     */
    public initRegExp(scope): void;

    /**
     * Initialize JSON object.
     * @param {!Object} scope Global scope.
     */
    public initJSON(scope): void;

    /**
     * Is an object of a certain class?
     * @param {Object} child Object to check.
     * @param {!Object} parent Class of object.
     * @return {boolean} True if object is the class or inherits from it.
     *     False otherwise.
     */
    public isa(child, parent): boolean;

    /**
     * Compares two objects against each other.
     * @param {!Object} a First object.
     * @param {!Object} b Second object.
     * @return {number} -1 if a is smaller, 0 if a == b, 1 if a is bigger,
     *     NaN if they are not comparable.
     */
    public comp(a, b): number;

    /**
     * Is a value a legal integer for an array?
     * @param {*} n Value to check.
     * @return {number} Zero, or a positive integer if the value can be
     *     converted to such.  NaN otherwise.
     */
    public arrayIndex(n): number;

    /**
     * Create a new data object for a primitive.
     * @param {undefined|null|boolean|number|string} data Data to encapsulate.
     * @return {!Object} New data object.
     */
    public createPrimitive(data: boolean|number|string);

    /**
     * Create a new data object.
     * @param {Object} parent Parent constructor function.
     * @return {!Object} New data object.
     */
    public createObject(parent);

    /**
     * Creates a new regular expression object.
     * @param {Object} obj The existing object to set.
     * @param {Object} data The native regular expression.
     * @return {!Object} New regular expression object.
     */
    public createRegExp(obj, data);

    /**
     * Create a new function.
     * @param {Object} node AST node defining the function.
     * @param {Object} opt_scope Optional parent scope.
     * @return {!Object} New function.
     */
    public createFunction(node, opt_scope);

    /**
     * Create a new native function.
     * @param {!Function} nativeFunc JavaScript function.
     * @return {!Object} New function.
     */
    public createNativeFunction(nativeFunc);

    /**
     * Fetch a property value from a data object.
     * @param {!Object} obj Data object.
     * @param {*} name Name of property.
     * @return {!Object} Property value (may be UNDEFINED).
     */
    public getProperty(obj, name);

    /**
     * Does the named property exist on a data object.
     * @param {!Object} obj Data object.
     * @param {*} name Name of property.
     * @return {boolean} True if property exists.
     */
    public hasProperty(obj, name);

    /**
     * Set a property value on a data object.
     * @param {!Object} obj Data object.
     * @param {*} name Name of property.
     * @param {*} value New property value.
     * @param {Object=} opt_descriptor Optional descriptor object.
     * @returns {!Interpreter.Object|undefined} Returns a setter function if one needs to be called, otherwise undefined
     */
    public setProperty(obj, name, value, opt_descriptor = null): void;

    /**
     * Delete a property value on a data object.
     * @param {!Object} obj Data object.
     * @param {*} name Name of property.
     */
    public deleteProperty(obj, name): void;

    /**
     * Returns the current scope from the stateStack.
     * @return {!Object} Current scope dictionary.
     */
    public getScope();

    /**
     * Create a new scope dictionary.
     * @param {!Object} node AST node defining the scope container
     *     (e.g. a function).
     * @param {Object} parentScope Scope to link to.
     * @return {!Object} New scope.
     */
    public createScope(node, parentScope);

    /**
     * Retrieves a value from the scope chain.
     * @param {!Object} name Name of variable.
     * @throws {string} Error if identifier does not exist.
     */
    public getValueFromScope(name);

    /**
     * Sets a value to the current scope.
     * @param {!Object} name Name of variable.
     * @param {*} value Value.
     */
    public setValueToScope(name, value): void;

    /**
     * Gets a value from the scope chain or from an object property.
     * @param {!Object|!Array} left Name of variable or object/propname tuple.
     * @return {!Object} Value.
     */
    public getValue(left);

    /**
     * Sets a value to the scope chain or to an object property.
     * @param {!Object|!Array} left Name of variable or object/propname tuple.
     * @param {!Object} value Value.
     */
    public setValue(left, value): void;

    /**
     * Value of the interpreter
     */
    public value : any;
}

declare module "js-interpreter";