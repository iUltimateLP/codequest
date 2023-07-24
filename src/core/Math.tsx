/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

'use client';

class MathUtils {
    // rad2deg
    public static rad2deg(rad : number) : number {
        return rad * (180 / Math.PI);
    }
    
    // deg2rad
    public static deg2rad(deg : number) : number {
        return deg * (Math.PI / 180);
    }

    // Clamps a number between min/max
    public static clamp(x : number, min : number, max : number) {
        return x < min ? min : x < max ? x : max;
    }

    // Interpolates a given value from current to target (algorithm copied from Unreal's FMath::FInterpTo)
    public static interpTo(current : number, target : number, deltaTime : number, interpSpeed : number, tolerance : number = 0.0001) : number {
        if (interpSpeed <= 0) return target;
        var dist = target - current;
        if (Math.pow(dist, 2) < tolerance) return target;
        var deltaMove = dist * MathUtils.clamp(deltaTime * interpSpeed, 0, 1);
        return current + deltaMove;
    }

    // Interpolates a given value constantly from current to target (algorithm copied from Unreal's FMath::FInterpTo)
    public static interpToConstant(current : number, target : number, deltaTime : number, interpSpeed : number, tolerance : number = 0.0001) : number {
        var dist = target - current;
        if (Math.pow(dist, 2) < tolerance) return target;
        var step = interpSpeed * deltaTime;
        var deltaMove = MathUtils.clamp(dist, -step, step);
        return current + deltaMove;
    }

    // Interpolates a given value from current to target (algorithm copied from Unreal's FMath::FInterpTo) with account for gimbal lock
    public static interpToDeg(current : number, target : number, deltaTime : number, interpSpeed : number, tolerance : number = 0.0001) : number {
        if (interpSpeed <= 0) return target;
        // What the hell is this math? I don't even want to know... Please god, no one ask me ever how this works...
		// Source: https://stackoverflow.com/questions/2708476/rotation-interpolation
		var shortestAngle : number = ((((target - current) % 360) + 540) % 360) - 180;
		var deltaMove : number = shortestAngle * MathUtils.clamp(deltaTime * interpSpeed, 0, 1);
        return current + deltaMove;
    }
};

export { MathUtils };