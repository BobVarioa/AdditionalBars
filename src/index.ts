import Cppkies from "cppkies"
import SkullyCore from "skullycore"
import { BarWidget } from "skullycore"
import ToggleWidget from "./ToggleWidget"

let additionalBars = {
	widgets: {} as Record<string, (BarWidget & Record<string,any>)>
}

declare global {
	interface Window {
		additionalBars: typeof additionalBars | undefined
	}
}

Cppkies.onLoad.push(() => {
	Cppkies.on("check", () => {
		if (typeof additionalBars !== "undefined") {
			if (Game.HasAchiev("Cheated cookies taste awful") && additionalBars.widgets.cheaterWidget.hidden) {
				console.log("unlock cheated")
				additionalBars.widgets.cheaterWidget.hidden = false;
			}
			if (Game.Has("Golden switch") && additionalBars.widgets.goldenSwitch.hidden) {
				console.log("unlock golden")
				additionalBars.widgets.goldenSwitch.hidden = false;
			}
			if (Game.Has("Season switcher") && additionalBars.widgets.seasonSwitcher.hidden) {
				console.log("unlock season")
				additionalBars.widgets.seasonSwitcher.hidden = false;
			}
			if (Game.Objects["Wizard tower"].level > 0 && additionalBars.widgets.spellWidget.hidden) {
				console.log("unlock wizard")
				additionalBars.widgets.spellWidget.hidden = false;
			}
			
		}
	})
})

SkullyCore.onLoad.push(() => {
	additionalBars = {
		widgets: {
			cheaterWidget: new SkullyCore.TopBarMenuWidget("cheater", [10, 6]),
			goldenSwitch: new SkullyCore.TopBarMenuWidget("goldenSwitch", Game.Has("Golden switch [on]") ? [21, 10] : [20, 10]),
			seasonSwitcher: new ToggleWidget("seasonSwitcher", "Season Switcher", [16,6], () => {
				let choices: Game.SelectorSwitchChoice[]= [];
				// I don't push because I need hardcode stuff here
				if (Game.Upgrades["Festive biscuit"].unlocked && !Game.Upgrades["Festive biscuit"].bought) {
					choices[0] = {name: "Festive biscuit", icon: [12,10], order: 1}
				}
				if (Game.Upgrades["Ghostly biscuit"].unlocked && !Game.Upgrades["Ghostly biscuit"].bought){
					choices[1] = {name: "Ghostly biscuit", icon: [13,8], order: 2}
				}
				if (Game.Upgrades["Lovesick biscuit"].unlocked && !Game.Upgrades["Lovesick biscuit"].bought) {
					choices[2] = {name: "Lovesick biscuit", icon: [20,3], order: 3}
				}
				if (Game.Upgrades["Fool's biscuit"].unlocked && !Game.Upgrades["Fool\'s biscuit"].bought) {
					choices[3] = {name: "Fool's biscuit", icon: [17,6], order: 4}
				}
				if (Game.Upgrades["Bunny biscuit"].unlocked && !Game.Upgrades["Bunny biscuit"].bought) {
					choices[4] = {name: "Bunny biscuit", icon: [0,12], order: 5}
				}
				return choices
			}, (id) => {
				switch (id) {
					case 0: // Christmas
						Game.Upgrades["Festive biscuit"].buy(false)
						break;
					case 1: // Haloween
						Game.Upgrades["Ghostly biscuit"].buy(false)
						break;
					case 2: // Valentines 
						Game.Upgrades["Lovesick biscuit"].buy(false)
						break;
					case 3: // Business Day
						Game.Upgrades["Fool's biscuit"].buy(false)
						break;
					case 4: // Easter
						Game.Upgrades["Bunny biscuit"].buy(false)
						break
				}
			}),
			spellWidget: new ToggleWidget("wizardWidget", "Spell Selector", [22,11], () => {
				let choices: Game.SelectorSwitchChoice[] = [];

				choices[0] = {name: "Conjure Baked Goods", icon: [21,11], order: 1}
				choices[1] = {name: "Force the Hand of Fate", icon: [22,11], order: 1}
				choices[2] = {name: "Stretch Time", icon: [23,11], order: 1}
				choices[3] = {name: "Spontaneous Edifice", icon: [24,11], order: 1}
				choices[4] = {name: "Haggler's Charm", icon: [25,11], order: 1}
				choices[5] = {name: "Summon Crafty Pixies", icon: [26,11], order: 1}
				choices[6] = {name: "Gambler's Fever Dream", icon: [27,11], order: 1}
				choices[7] = {name: "Resurrect Abomination", icon: [28,11], order: 1}
				choices[8] = {name: "Diminish Ineptitude", icon: [29,11], order: 1}

				return choices
			}, (id) => {
				switch (id) {
					case 0:
						Game.Objects["Wizard tower"].minigame.castSpell(Game.Objects["Wizard tower"].minigame.spells["conjure baked goods"])
						break;
					case 1:
						Game.Objects["Wizard tower"].minigame.castSpell(Game.Objects["Wizard tower"].minigame.spells["hand of fate"])
						break;
					case 2:
						Game.Objects["Wizard tower"].minigame.castSpell(Game.Objects["Wizard tower"].minigame.spells["stretch time"])
						break;
					case 3:
						Game.Objects["Wizard tower"].minigame.castSpell(Game.Objects["Wizard tower"].minigame.spells["spontaneous edifice"])
						break;
					case 4:
						Game.Objects["Wizard tower"].minigame.castSpell(Game.Objects["Wizard tower"].minigame.spells["haggler's charm"])
						break;
					case 5:
						Game.Objects["Wizard tower"].minigame.castSpell(Game.Objects["Wizard tower"].minigame.spells["summon crafty pixies"])
						break;
					case 6:
						Game.Objects["Wizard tower"].minigame.castSpell(Game.Objects["Wizard tower"].minigame.spells["gambler's fever dream"])
						break;
					case 7:
						Game.Objects["Wizard tower"].minigame.castSpell(Game.Objects["Wizard tower"].minigame.spells["resurrect abomination"])
						break;
					case 8:
						Game.Objects["Wizard tower"].minigame.castSpell(Game.Objects["Wizard tower"].minigame.spells["diminish ineptitude"])
						break;
				}
			}),
			shimmeringWidget: new SkullyCore.TopBarMenuWidget("shimmeringWidget", Game.Has("Golden switch [on]") ? [21, 10] : [20, 10]),
		}
	}
	additionalBars.widgets.cheaterWidget.hidden = true;
	additionalBars.widgets.cheaterWidget.onclick = () => {
		Game.RuinTheFun(true);
		Game.Win("Cheated cookies taste awful"); // If you are a super duper cheater and cheated the cheaterWidget in
	}
	
	additionalBars.widgets.goldenSwitch.hidden = true;
	additionalBars.widgets.goldenSwitch.onclick=new Function(
	`if (Game.Upgrades["Golden switch [off]"].unlocked && !Game.Upgrades["Golden switch [off]"].bought) {
		console.log("hi [off]")
		if (Game.Upgrades["Golden switch [off]"].buy()) {
			window.SkullyCore.BarWidgets.TopBar.Bars[${additionalBars.widgets.goldenSwitch.index}].div.children[0].setAttribute("style", "${SkullyCore.IconToStyle([21, 10])}")
		}
	} else if (Game.Upgrades["Golden switch [on]"].unlocked && !Game.Upgrades["Golden switch [on]"].bought) {
		console.log("hi [on]")
		if (Game.Upgrades["Golden switch [on]"].buy()) {
			window.SkullyCore.BarWidgets.TopBar.Bars[${additionalBars.widgets.goldenSwitch.index}].div.children[0].setAttribute("style", "${SkullyCore.IconToStyle([20, 10])}")
		}
	}`) as ()=>void

	additionalBars.widgets.seasonSwitcher.hidden = true;
	additionalBars.widgets.spellWidget.hidden = true;
})