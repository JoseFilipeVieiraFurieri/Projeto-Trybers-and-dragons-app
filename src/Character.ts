import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  private _name: string;

  constructor(
    name: string,
  ) {
    this._name = name;
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(this._name, this._dexterity);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._archetype = new Mage(this._name);
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = { 
      type_: this._archetype.energyType, 
      amount: getRandomInt(1, 10), 
    };
  }

  get race() {
    return this._race;
  }

  get archetype() {
    return this._archetype;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy(): Energy {
    return { ...this._energy };
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) {
      this._lifePoints -= damage;
    }
    if (damage <= 0) {
      this._lifePoints -= 1;
    }
    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }
    return this._lifePoints;
  }

  attack(enemy: Fighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;

    const newMaxLife = this._maxLifePoints + getRandomInt(1, 10);

    if (newMaxLife > this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    } else {
      this._maxLifePoints = newMaxLife;
    }

    this._lifePoints = this._maxLifePoints;
  }

  special(enemy: Fighter): void {
    console.log(`Requisito é grande demais, ${enemy.attack}, ${this._name}`);
  }
}

export default Character;