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
			}, function (id) {
				switch (id) {
					case 0: // Christmas
						break;
					case 1: // Haloween
						break;
					case 2: // Febuary 
						break;
					case 3: // Business Day
						break;
					case 4: // Easter
						break
				}
				console.log(id)
			})
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

	additionalBars.widgets.seasonSwitcher.hidden = true
})