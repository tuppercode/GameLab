
  /*  Modification of Code.org GameLab Group Object so that it can be used outside of Code.org environment
   * Create new helper called _groupCollideGameLab() which can be called as a
   * stateful nativeFunc by the interpreter. This enables the native method tozom
   * be called multiple times so that it can go asynchronous every time it
   * (or any native function that it calls, such as _collideWith) wants to execute
   * a callback back into interpreter code. The interpreter state object is
   * retrieved by calling JSInterpreter.getCurrentState().
   *
   * Additional properties can be set on the state object to track state
   * across the multiple executions. If the function wants to be called again,
   * it should set state.doneExec to false. When the function is complete and
   * no longer wants to be called in a loop by the interpreter, it should set
   * state.doneExec to true and return a value.
   *
   * Collide each member of group against the target using the given collision
   * type.  Return true if any collision occurred.
   * Internal use
   *
   * @private
   * @method _groupCollideGameLab
   * @param {!string} type one of 'overlap', 'collide', 'displace', 'bounce', or
   * 'bounceOff'
   * @param {Object} target Group or Sprite
   * @param {Function} [callback] on collision.
   * @return {boolean} True if any collision/overlap occurred
   */
  
  // Replace these four methods that take callback parameters to use the
  // replaced _groupCollideGameLab() function:
/*
  array.overlap = _groupCollideGameLab.bind(array, 'overlap');
  array.collide = _groupCollideGameLab.bind(array, 'collide');
  array.displace = _groupCollideGameLab.bind(array, 'displace');
  array.bounce = _groupCollideGameLab.bind(array, 'bounce');
  array.bounceOff = _groupCollideGameLab.bind(array, 'bounceOff');
*/
  /**
   * Test each member of group against the target using the isTouching sprite
   * method.  Return true if any touching occurred.
   * This follows the same approach as _groupCollideGameLab to properly
   * handle JSInterpreter __substate.
   *
   * @method isTouching
   * @param {Object} target Group or Sprite
   * @return {boolean} True if any touching occurred
   */

var createGroupGL = function () {
  var array = Group();

  array.isTouching = function (target) {
  //  console.log(this+"group isTouching target"+target);
    return this.overlap(target);
  };
  /*  var state = jsInterpreter.getCurrentState();
    if (!state.__i) {
      state.__i = 0;
      state.__didCollide = false;
    }
    if (state.__i < this.size()) {
      if (!state.__subState) {
        // Before we call Sprite.isTouching which calls _collideWith (another stateful function),
        // hang a __subState off of state, so it can use that instead to track its state:
        state.__subState = { doneExec: true };
      }
      var didTouch = this.get(state.__i).isTouching(target);
      if (state.__subState.doneExec) {
        state.__didCollide = didTouch || state.__didCollide;
        delete state.__subState;
        state.__i++;
      }
      state.doneExec = false;
    } else {
      state.doneExec = true;
      return state.__didCollide;
    }
  };
*/
  array.setPropertyEach = function (propName, value) {
    for (var i = 0; i < this.length; i++) {
      this[i][propName] = value;
    }
  };

  array.callMethodEach = function (methodName) {
    // Copy all arguments after the first parameter into methodArgs:
    var methodArgs = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < this.length; i++) {
      this[i][methodName].apply(this[i], methodArgs);
    }
  };

  array.setDepthEach = array.setPropertyEach.bind(array, 'depth');
  array.setLifetimeEach = array.setPropertyEach.bind(array, 'lifetime');
  array.setRotateToDirectionEach = array.setPropertyEach.bind(array, 'rotateToDirection');
  array.setRotationEach = array.setPropertyEach.bind(array, 'rotation');
  array.setRotationSpeedEach = array.setPropertyEach.bind(array, 'rotationSpeed');
  array.setScaleEach = array.setPropertyEach.bind(array, 'scale');
  array.setColorEach = array.setPropertyEach.bind(array, 'shapeColor');
  array.setVisibleEach = array.setPropertyEach.bind(array, 'visible');
  array.setVelocityXEach = array.setPropertyEach.bind(array, 'velocityX');
  array.setVelocityYEach = array.setPropertyEach.bind(array, 'velocityY');
  array.setHeightEach = array.setPropertyEach.bind(array, 'height');
  array.setWidthEach = array.setPropertyEach.bind(array, 'width');

  array.destroyEach = array.callMethodEach.bind(array, 'destroy');
  array.pointToEach = array.callMethodEach.bind(array, 'pointTo');
  array.setAnimationEach = array.callMethodEach.bind(array, 'setAnimation');
  array.setColliderEach = array.callMethodEach.bind(array, 'setCollider');
  array.setSpeedAndDirectionEach = array.callMethodEach.bind(array, 'setSpeedAndDirection');
  array.setVelocityEach = array.callMethodEach.bind(array, 'setVelocity');
  array.setMirrorXEach = array.callMethodEach.bind(array, 'mirrorX');
  array.setMirrorYEach = array.callMethodEach.bind(array, 'mirrorY');

  return array;
};
