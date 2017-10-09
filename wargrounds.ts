import victor = require("victor");

interface Commanded {
  public getCommander(): Commander;
}

interface Damageable {
  public onDamage(amount: number): void;
}

interface Positioned {
  public getPosition(): victor;
}

class Generator implements Commanded, Damageable, Positioned {
  constructor(
    private $scope: angular.IScope,
    private gameContext: GameContext,
    private commander: Commander,
    private resources: number,
    private resourceCapacity: number,
    private resourceGenerationSpeed: number,
    private health: number,
    private position: victor
  ) {
    this.$scope.on("update", this.onUpdate.bind(this));
  }

  private destroy(): void {
    this.$scope.$destroy();
  }
  public getCommander(): Commander {
    return this.commander;
  }
  public onDamage(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }
  public getPosition(): victor {
    return this.position;
  }

  private onUpdate(timeChange: number): void {
    this.resources = Math.min(this.resources + this.resourceGenerationSpeed * timeChange, this.resourceCapacity);
  }
}

class Cannon implements Commanded, Damageable, Positioned {
  constructor(
    private $scope: angular.IScope,
    private gameContext: GameContext,
    private commander: Commander,
    private damage: number,
    private range: number,
    private timeUntilNextAttack: number,
    private timePerAttack: number,
    private position: victor,
    private health: number
  ) {
    this.$scope.on("update", this.onUpdate.bind(this));
  }
  public getCommander(): Commander {
    return this.commander;
  }
  public onDamage(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }
  public getPosition(): victor {
    return this.position;
  }
  private onUpdate(timeChange: number): void {
    if (this.timeUntilNextAttack <= 0) {
      let target = this.gameContext.getMostDamagedEnemyOfCommanderInCircle(
        this.commander,
        this.position,
        this.range,
      );
      if (target) {
        target.onDamage(this.damage);
        this.timeUntilNextAttack = this.timePerAttack;
      }
    }
  }
}

// class Shell {
//   constructor(
//     private $scope: angular.IScope,
//     private gameContext: GameContext,
//     private destination: victor,
//     private position: victor,
//     private speed: number,
//     private damage: number,
//     private range: number,
//     private health: number
//   ) {
//     this.$scope.on("update", this.onUpdate.bind(this));
//   }
// }

class Robot implements Commanded, Damageable, Positioned {
  constructor(
    private $scope: angular.IScope,
    private gameContext: GameContext,
    private commander: Commander,
    private destination: victor,
    private position: victor,
    private speed: victor,
    private resources: number,
    private resourceCapacity: number,
    private health: number
  ) {
    this.$scope.on("update", this.onUpdate.bind(this));
  }
  public getCommander(): Commander {
    return this.commander;
  }
  public onDamage(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }
  public getPosition(): victor {
    return this.position;
  }
}

class CommandCenter implements Commanded, Damageable, Positioned {
  constructor(
    private $scope: angular.IScope,
    private gameContext: GameContext,
    private commander: Commander,
    private position: victor,
    private resources: number,
    private resourceCapacity: number,
    private health: number
  ) {
  }
  public getCommander(): Commander {
    return this.commander;
  }
  public onDamage(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }
  public getPosition(): victor {
    return this.position;
  }
}

class SupplyDepot implements Commanded, Damageable, Positioned {
  constructor(
    private $scope: angular.IScope,
    private gameContext: GameContext,
    private commander: Commander,
    private resources: number,
    private resourceCapacity: number,
    private health: number
  ) {
  }
  public getCommander(): Commander {
    return this.commander;
  }
  public onDamage(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }
  public getPosition(): victor {
    return this.position;
  }
}

class Commander {
  constructor(
    private $scope: angular.IScope,
    private gameContext: GameContext,
    private name: string,
    private isControlledByInputs: boolean
  ) {
  }
  public getCommander(): Commander {
    return this.commander;
  }
  public onDamage(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }
  public getPosition(): victor {
    return this.position;
  }
}

class GameContext {
  public getMostDamagedEnemyOfCommanderInCircle(
    commander: Commander,
    position: victor,
    radius: number
  ): Damageable & Positioned & Commanded {
  }
}
