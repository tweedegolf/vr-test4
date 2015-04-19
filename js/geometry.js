/*
  Utils for geometric calculations.
*/

'use strict';

export const PI = Math.PI;
export const halfPI = PI/2;
export const quarterPI = PI/4;
export const twoPI = PI*2;

const
  DEG_TO_RAD = PI / 180,
  RAD_TO_DEG = 1 / DEG_TO_RAD;

export function degToRad(value){
    return value * DEG_TO_RAD;
}

export function radToDeg(value){
    return value * RAD_TO_DEG;
}