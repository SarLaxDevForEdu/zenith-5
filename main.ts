//  ZENITH CLIENT 5.0 - 100 EXTRA COMMANDS
//  Minecraft Education / MakeCode Python
//  No external mod, injector, or resource pack required.
//  Type help in Minecraft chat. All chat commands use zero arguments.
//  Use only in a world you own or have permission to modify.
//  0 Zeus, 1 TP, 2 Fly, 3 Aura, 4 Spider, 5 Phase,
//  6 Wings, 7 Shield, 8 Scaffold, 9 NoFall, 10 Fullbright,
//  11 FastMine, 12 SprintAssist, 13 Fireproof.
let hacks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false]
let zeus_seconds = [0]
let nuke_busy = [false]
let kit_step = [-1]
let kit_enchant_index = [0]
let kit_ready = [false]
let home_set = [false]
let home_location = [player.position()]
let gear_names = ["Helmet", "Chestplate", "Leggings", "Boots", "Sword", "Axe", "Pickaxe", "Mace"]
let gear_ids = ["netherite_helmet", "netherite_chestplate", "netherite_leggings", "netherite_boots", "netherite_sword", "netherite_axe", "netherite_pickaxe", "mace"]
let supplies = ["give @p oak_planks 64", "give @p oak_planks 64", "give @s totem_of_undying 15", "give @s end_crystal 64", "give @s end_crystal 64", "give @s ender_pearl 16", "give @s ender_pearl 16", "give @s wind_charge 64", "give @s respawn_anchor 64", "give @s respawn_anchor 64", "give @s glowstone 64", "give @s glowstone 64", "give @s obsidian 64", "give @s obsidian 64"]
let ring_counts = [5, 10, 14, 19, 24, 29, 33, 38, 43, 48, 52, 57, 62, 67, 71, 76, 81, 86, 90, 95]
//  ---------------- CHAT MENUS ----------------
function help_menu() {
    player.say("=== ZENITH CLIENT 5.0 ===")
    player.say("kit / next - Guided enchanted kit")
    player.say("kitstatus / kitretry / kitskip / kitcancel")
    player.say("supplies / enchhelp / diamonds")
    player.say("zeus/stopzeus, aura/stopaura")
    player.say("shield/stopshield, tp/stoptp, blink")
    player.say("fly/stopfly, spider/stopspider")
    player.say("phase/stopphase, phasego")
    player.say("wings/stopwings, jump, speed, haste")
    player.say("vision, stopfx, check, alloff")
    player.say("modules - NEW movement/utility modules")
    player.say("status / panic / coords / sethome / home")
    player.say("nuketest / nuke - 1000 TNT, 20 rings")
    player.say("scaffoldtest / scaffoldreset / fxcheck")
    player.say("newhelp - 100 EXTRA features by category")
}

player.onChat("Help", function help_upper() {
    help_menu()
})
player.onChat("help", function help_lower() {
    help_menu()
})
player.onChat("modules", function modules_menu() {
    player.say("=== INSPIRED UTILITY MODULES ===")
    player.say("scaffold / stopscaffold - 12-block prefill")
    player.say("scaffoldtest / scaffoldreset - Test/reset Y")
    player.say("fxcheck - Test potion effects")
    player.say("nofall / stopnofall - Slow Falling")
    player.say("bright / stopbright - Night Vision")
    player.say("fastmine / stopmine - Haste IV")
    player.say("sprint / stopsprint - Speed II assist")
    player.say("fireproof / stopfire - Fire Resistance")
    player.say("sethome / home - Saved point")
    player.say("status - Active modes; panic - All OFF")
    player.say("These are MakeCode approximations, not ESP/aimbot")
})
//  ---------------- KIT ENCHANTMENTS ----------------
function enchants_for(step: number): string[] {
    if (step == 0) {
        return ["protection 4", "unbreaking 3", "mending 1", "respiration 3", "aqua_affinity 1"]
    }
    
    if (step == 1 || step == 2) {
        return ["protection 4", "unbreaking 3", "mending 1"]
    }
    
    if (step == 3) {
        return ["protection 4", "unbreaking 3", "mending 1", "feather_falling 4", "depth_strider 3"]
    }
    
    if (step == 4) {
        return ["sharpness 5", "unbreaking 3", "mending 1", "fire_aspect 2", "knockback 1"]
    }
    
    if (step == 5) {
        return ["sharpness 5", "efficiency 5", "unbreaking 3", "mending 1"]
    }
    
    if (step == 6) {
        return ["efficiency 5", "unbreaking 3", "mending 1", "fortune 3"]
    }
    
    return ["breach 4", "unbreaking 3", "mending 1", "wind_burst 3"]
}

function is_holding_gear(step: number): boolean {
    //  Bedrock 'hasitem' selector checks the exact mainhand item.
    //  If your game lacks this selector, it will report a failed check.
    return player.execute("testfor @s[hasitem={item=" + gear_ids[step] + ",location=slot.weapon.mainhand}]")
}

function enchant_one(step: number) {
    if (!is_holding_gear(step)) {
        player.say("Hold your " + gear_names[step] + " first!")
        return
    }
    
    let failed = 0
    for (let enchantment of enchants_for(step)) {
        if (!player.execute("enchant @s " + enchantment)) {
            failed = failed + 1
            player.say("Rejected: " + enchantment)
        }
        
        loops.pause(80)
    }
    if (failed == 0) {
        player.say("Enchanted " + gear_names[step] + "!")
    } else {
        player.say("Some enchants rejected; inspect the item.")
    }
    
}

player.onChat("enchhelp", function ench_help() {
    player.say("Hold matching item before typing:")
    player.say("enchhelm enchchest enchlegs enchboots")
    player.say("enchsword enchaxe enchpick enchmace")
    player.say("Sword: Sharp V / Fire II / Knockback I")
})
player.onChat("enchhelm", function ench_helm() {
    enchant_one(0)
})
player.onChat("enchchest", function ench_chest() {
    enchant_one(1)
})
player.onChat("enchlegs", function ench_legs() {
    enchant_one(2)
})
player.onChat("enchboots", function ench_boots() {
    enchant_one(3)
})
player.onChat("enchsword", function ench_sword() {
    enchant_one(4)
})
player.onChat("enchaxe", function ench_axe() {
    enchant_one(5)
})
player.onChat("enchpick", function ench_pick() {
    enchant_one(6)
})
player.onChat("enchmace", function ench_mace() {
    enchant_one(7)
})
//  ---------------- GUIDED KIT ----------------
function give_current_gear() {
    if (kit_step[0] < 0 || kit_step[0] >= 8) {
        return
    }
    
    let item = gear_ids[kit_step[0]]
    kit_ready[0] = player.execute("give @s " + item + " 1")
    if (kit_ready[0]) {
        player.say("Given " + gear_names[kit_step[0]] + ".")
        player.say("SELECT and HOLD it, then type next.")
    } else {
        player.say("Give failed: " + item + ". Use kitretry/kitskip.")
    }
    
}

function give_supplies() {
    let failed = 0
    for (let command of supplies) {
        if (!player.execute(command)) {
            failed = failed + 1
            player.say("Failed: " + command)
        }
        
        loops.pause(80)
    }
    if (failed == 0) {
        player.say("Supplies sent! Check inventory space.")
    } else {
        player.say("" + failed + " supply commands failed.")
    }
    
}

function advance_kit() {
    kit_step[0] = kit_step[0] + 1
    kit_enchant_index[0] = 0
    kit_ready[0] = false
    if (kit_step[0] >= 8) {
        kit_step[0] = -1
        player.say("Gear done. Giving PvP supplies...")
        give_supplies()
        player.say("Kit finished. Check armor and enchantments!")
    } else {
        give_current_gear()
    }
    
}

player.onChat("kit", function kit_start() {
    if (kit_step[0] >= 0) {
        player.say("Kit in progress; type kitstatus.")
        return
    }
    
    kit_step[0] = 0
    kit_enchant_index[0] = 0
    give_current_gear()
})
player.onChat("next", function kit_next() {
    if (kit_step[0] < 0) {
        player.say("Type kit to start.")
        return
    }
    
    if (!kit_ready[0]) {
        player.say("Give failed. Use kitretry or kitskip.")
        return
    }
    
    let step = kit_step[0]
    if (!is_holding_gear(step)) {
        player.say("Wrong held item. Select " + gear_names[step])
        return
    }
    
    let enchantments = enchants_for(step)
    for (let i = kit_enchant_index[0]; i < enchantments.length; i++) {
        if (!player.execute("enchant @s " + enchantments[i])) {
            kit_enchant_index[0] = i
            player.say("Rejected: " + enchantments[i])
            player.say("Type next to retry, or kitskip.")
            return
        }
        
        kit_enchant_index[0] = i + 1
        loops.pause(80)
    }
    player.say("Finished: " + gear_names[step])
    advance_kit()
})
player.onChat("kitstatus", function kit_status() {
    if (kit_step[0] < 0) {
        player.say("Kit inactive. Type kit.")
    } else {
        player.say("Hold " + gear_names[kit_step[0]] + " then next.")
        player.say("Progress: " + ("" + (kit_step[0] + 1)) + "/8 items")
    }
    
})
player.onChat("kitretry", function kit_retry() {
    if (kit_step[0] < 0) {
        player.say("Kit inactive.")
        return
    }
    
    //  A new, unenchanted item must restart the enchantment sequence.
    kit_enchant_index[0] = 0
    give_current_gear()
})
player.onChat("kitskip", function kit_skip() {
    if (kit_step[0] < 0) {
        player.say("Kit inactive.")
        return
    }
    
    player.say("Skipped: " + gear_names[kit_step[0]])
    advance_kit()
})
player.onChat("kitcancel", function kit_cancel() {
    kit_step[0] = -1
    kit_ready[0] = false
    kit_enchant_index[0] = 0
    player.say("Kit canceled. Already-given items remain.")
})
player.onChat("supplies", function supplies_only() {
    give_supplies()
})
//  ---------------- BASE MODULE TOGGLES ----------------
function move_forward(blocks_ahead: number): boolean {
    let destination = posCamera(0, 0, blocks_ahead)
    let head = posCamera(0, 1, blocks_ahead)
    if (blocks.testForBlock(AIR, destination) && blocks.testForBlock(AIR, head)) {
        return player.teleport(destination)
    }
    
    return false
}

player.onChat("zeus", function zeus_on() {
    hacks[0] = true
    zeus_seconds[0] = 30
    player.say("Zeus ON (30s)")
    player.say("Stop with: stopzeus")
})
player.onChat("stopzeus", function zeus_off() {
    hacks[0] = false
    zeus_seconds[0] = 0
    player.say("Zeus OFF")
})
player.onChat("aura", function aura_on() {
    hacks[3] = true
    player.say("Aura Strength II ON (not auto-attack)")
    player.say("Stop with: stopaura")
})
player.onChat("stopaura", function aura_off() {
    hacks[3] = false
    player.execute("effect @s clear strength")
    player.say("Aura OFF")
})
player.onChat("shield", function shield_on() {
    hacks[7] = true
    player.say("Regen/Resistance Shield ON")
    player.say("Stop with: stopshield")
})
player.onChat("stopshield", function shield_off() {
    hacks[7] = false
    player.execute("effect @s clear regeneration")
    player.execute("effect @s clear resistance")
    player.say("Shield OFF")
})
player.onChat("tp", function tp_on() {
    hacks[1] = true
    player.say("Blink ready. Type blink.")
    player.say("Stop with: stoptp")
})
player.onChat("stoptp", function tp_off() {
    hacks[1] = false
    player.say("Blink OFF")
})
player.onChat("blink", function blink() {
    if (!hacks[1]) {
        player.say("Enable tp first.")
    } else if (move_forward(6)) {
        player.say("Blink! One-shot; no stop needed.")
    } else {
        player.say("Destination blocked or teleport failed.")
    }
    
})
player.onChat("fly", function fly_on() {
    if (player.execute("ability @s mayfly true")) {
        hacks[2] = true
        player.say("Flight ON. Double-tap Jump.")
        player.say("Stop with: stopfly")
    } else {
        player.say("Flight unavailable: check world permissions.")
    }
    
})
player.onChat("stopfly", function fly_off() {
    if (player.execute("ability @s mayfly false")) {
        hacks[2] = false
        player.say("Flight OFF; land safely.")
    } else {
        player.say("Flight disable failed.")
    }
    
})
player.onChat("spider", function spider_on() {
    hacks[4] = true
    player.say("Spider assist ON (face wall)")
    player.say("Stop with: stopspider")
})
player.onChat("stopspider", function spider_off() {
    hacks[4] = false
    player.say("Spider assist OFF")
})
player.onChat("phase", function phase_on() {
    hacks[5] = true
    player.say("Phase dash ready: type phasego")
    player.say("Stop with: stopphase")
})
player.onChat("stopphase", function phase_off() {
    hacks[5] = false
    player.say("Phase dash OFF")
})
player.onChat("phasego", function phase_go() {
    if (!hacks[5]) {
        player.say("Enable phase first.")
    } else if (move_forward(4)) {
        player.say("Dash! One-shot; no stop needed.")
    } else {
        player.say("Destination blocked or teleport failed.")
    }
    
})
player.onChat("wings", function wings_on() {
    hacks[6] = true
    player.say("Wings levitation ON (not actual Elytra)")
    player.say("Stop with: stopwings")
})
player.onChat("stopwings", function wings_off() {
    hacks[6] = false
    player.execute("effect @s clear levitation")
    player.say("Wings levitation OFF")
})
//  ---------------- NEW VAPE/HORION-INSPIRED UTILITIES ----------------
function apply_potion(effect_name: string, seconds: number, amplifier: number): boolean {
    return player.execute("effect @s " + effect_name + " " + ("" + seconds) + " " + ("" + amplifier) + " true")
}

//  ZENITH CLIENT 4.2.3 - FAST PREFILL SCAFFOLD
//  One KEEP fill replaces many individual place/test calls.
//  Builds at a fixed height, 12 blocks ahead, with a side margin.
//  It preserves existing terrain and blocks. It may make broad
//  rectangular glass platforms when you face diagonally.
let scaffold_level = [0]
let scaffold_blocks = [0]
//  Count fill operations, not individual blocks.
let scaffold_last_x = [9999999]
let scaffold_last_z = [9999999]
let scaffold_last_dir = [9999999]
function lock_scaffold_level() {
    scaffold_level[0] = Math.floor(player.position().getValue(Axis.Y)) - 1
}

function forget_scaffold_position() {
    scaffold_last_x[0] = 9999999
    scaffold_last_z[0] = 9999999
    scaffold_last_dir[0] = 9999999
}

function build_scaffold_platform(): boolean {
    let current = player.position()
    let x0 = Math.floor(current.getValue(Axis.X))
    let z0 = Math.floor(current.getValue(Axis.Z))
    let heading_degrees = player.getOrientation()
    let direction = Math.round(heading_degrees / 15)
    //  Do not resend an identical fill while standing still.
    if (x0 == scaffold_last_x[0] && z0 == scaffold_last_z[0] && direction == scaffold_last_dir[0]) {
        return false
    }
    
    let angle = heading_degrees * Math.PI / 180
    let far_x = x0 + Math.round(-Math.sin(angle) * 12)
    let far_z = z0 + Math.round(Math.cos(angle) * 12)
    //  KEEP changes AIR only. Each corner is an absolute world pos.
    let low_x = Math.min(x0, far_x) - 1
    let high_x = Math.max(x0, far_x) + 1
    let low_z = Math.min(z0, far_z) - 1
    let high_z = Math.max(z0, far_z) + 1
    let first_corner = world(low_x, scaffold_level[0], low_z)
    let last_corner = world(high_x, scaffold_level[0], high_z)
    blocks.fill(GLASS, first_corner, last_corner, FillOperation.Keep)
    scaffold_last_x[0] = x0
    scaffold_last_z[0] = z0
    scaffold_last_dir[0] = direction
    scaffold_blocks[0] = scaffold_blocks[0] + 1
    return true
}

loops.forever(function fast_scaffold_loop() {
    if (hacks[8]) {
        build_scaffold_platform()
    }
    
    loops.pause(50)
})
function disable_modes() {
    for (let i = 0; i < hacks.length; i++) {
        hacks[i] = false
    }
    zeus_seconds[0] = 0
    for (let index = 0; index < 6; index++) {
        z5_effect_modes[index] = false
    }
    //  Clear only the effects Zenith uses; not all unrelated potions.
    let effect_names = ["strength", "regeneration", "resistance", "levitation", "slow_falling", "night_vision", "haste", "speed", "fire_resistance", "invisibility", "water_breathing", "absorption", "health_boost", "dolphins_grace", "conduit_power"]
    for (let effect_name of effect_names) {
        player.execute("effect @s clear " + effect_name)
    }
    player.execute("ability @s mayfly false")
}

player.onChat("scaffold", function scaffold_on() {
    lock_scaffold_level()
    forget_scaffold_position()
    scaffold_blocks[0] = 0
    hacks[8] = true
    build_scaffold_platform()
    player.say("FAST Scaffold ON: 12-block prebuild!")
    player.say("Stop with: stopscaffold")
    player.say("Bridge height: " + ("" + scaffold_level[0]))
})
player.onChat("scaffoldtest", function scaffold_test() {
    lock_scaffold_level()
    forget_scaffold_position()
    build_scaffold_platform()
    player.say("Test: 12 blocks ahead, KEEP fill requested.")
    player.say("Look ahead for the glass platform.")
})
player.onChat("scaffoldreset", function scaffold_reset() {
    lock_scaffold_level()
    forget_scaffold_position()
    player.say("Scaffold Y reset: " + ("" + scaffold_level[0]))
    if (hacks[8]) {
        build_scaffold_platform()
    }
    
})
player.onChat("stopscaffold", function scaffold_off() {
    hacks[8] = false
    player.say("Scaffold OFF; glass remains.")
    player.say("Fill operations: " + ("" + scaffold_blocks[0]))
})
player.onChat("nofall", function nofall_on() {
    hacks[9] = true
    if (apply_potion("slow_falling", 5, 0)) {
        player.say("NoFall ON: Slow Falling")
        player.say("Stop with: stopnofall")
    } else {
        player.say("NoFall failed; check game commands")
    }
    
})
player.onChat("stopnofall", function nofall_off() {
    hacks[9] = false
    player.execute("effect @s clear slow_falling")
    player.say("NoFall OFF")
})
player.onChat("bright", function bright_on() {
    hacks[10] = true
    if (mobs.applyEffect(NIGHT_VISION, mobs.target(LOCAL_PLAYER), 20, 0)) {
        player.say("Fullbright ON: Night Vision")
        player.say("Stop with: stopbright")
    } else {
        player.say("Fullbright failed")
    }
    
})
player.onChat("stopbright", function bright_off() {
    hacks[10] = false
    player.execute("effect @s clear night_vision")
    player.say("Fullbright OFF")
})
player.onChat("fastmine", function fastmine_on() {
    hacks[11] = true
    if (apply_potion("haste", 5, 3)) {
        player.say("FastMine ON: Haste IV")
        player.say("Stop with: stopmine")
    } else {
        player.say("FastMine failed")
    }
    
})
player.onChat("stopmine", function fastmine_off() {
    hacks[11] = false
    player.execute("effect @s clear haste")
    player.say("FastMine OFF")
})
player.onChat("sprint", function sprint_on() {
    hacks[12] = true
    if (mobs.applyEffect(SPEED, mobs.target(LOCAL_PLAYER), 5, 1)) {
        player.say("Sprint Assist ON: Speed II")
        player.say("Stop with: stopsprint")
    } else {
        player.say("Sprint Assist failed")
    }
    
})
player.onChat("stopsprint", function sprint_off() {
    hacks[12] = false
    player.execute("effect @s clear speed")
    player.say("Sprint Assist OFF")
})
player.onChat("fireproof", function fire_on() {
    hacks[13] = true
    if (mobs.applyEffect(FIRE_RESISTANCE, mobs.target(LOCAL_PLAYER), 5, 0)) {
        player.say("Fireproof ON")
        player.say("Stop with: stopfire")
    } else {
        player.say("Fireproof failed")
    }
    
})
player.onChat("stopfire", function fire_off() {
    hacks[13] = false
    player.execute("effect @s clear fire_resistance")
    player.say("Fireproof OFF")
})
player.onChat("sethome", function sethome() {
    home_location[0] = player.position()
    home_set[0] = true
    player.say("Home saved for this code session.")
})
player.onChat("home", function go_home() {
    if (!home_set[0]) {
        player.say("Type sethome first.")
    } else if (player.teleport(home_location[0])) {
        player.say("Returned home!")
    } else {
        player.say("Home teleport failed; check destination.")
    }
    
})
player.onChat("coords", function coords() {
    player.say("Current XYZ:")
    player.say(player.position())
})
player.onChat("status", function status() {
    let names = ["Zeus", "TP", "Fly", "Aura", "Spider", "Phase", "Wings", "Shield", "Scaffold", "NoFall", "Bright", "FastMine", "Sprint", "Fireproof"]
    let count = 0
    for (let i = 0; i < hacks.length; i++) {
        if (hacks[i]) {
            player.say("ON: " + names[i])
            count = count + 1
        }
        
    }
    if (count == 0) {
        player.say("No continuous modes active.")
    }
    
    if (kit_step[0] >= 0) {
        player.say("Kit paused at " + gear_names[kit_step[0]])
    }
    
    if (hacks[8]) {
        player.say("Scaffold fill operations: " + ("" + scaffold_blocks[0]))
    }
    
    if (nuke_busy[0]) {
        player.say("Orbital strike in progress")
    }
    
})
player.onChat("alloff", function all_off() {
    disable_modes()
    player.say("Potion/movement modes OFF. World rules unchanged.")
    player.say("Active TNT cannot be recalled.")
})
player.onChat("panic", function panic() {
    disable_modes()
    player.say("PANIC: movement/effects OFF; world rules unchanged.")
    player.say("Active TNT cannot be recalled!")
})
//  ---------------- CONTINUOUS MODES ----------------
loops.forever(function continuous_modes() {
    if (hacks[0]) {
        mobs.spawn(mobs.projectile(LIGHTNING_BOLT), posCamera(0, 0, 12))
        mobs.spawn(mobs.projectile(LIGHTNING_BOLT), posCamera(0, 0, 20))
        zeus_seconds[0] = zeus_seconds[0] - 1
        if (zeus_seconds[0] <= 0) {
            hacks[0] = false
            player.say("Zeus timer finished")
        }
        
    }
    
    if (hacks[3]) {
        mobs.applyEffect(STRENGTH, mobs.target(LOCAL_PLAYER), 3, 1)
    }
    
    if (hacks[4]) {
        //  Does not move you if the two blocks above are occupied.
        if (!blocks.testForBlock(AIR, posCamera(0, 1, 1))) {
            if (blocks.testForBlock(AIR, pos(0, 2, 0)) && blocks.testForBlock(AIR, pos(0, 3, 0))) {
                player.teleport(pos(0, 1, 0))
            }
            
        }
        
    }
    
    if (hacks[6]) {
        mobs.applyEffect(LEVITATION, mobs.target(LOCAL_PLAYER), 3, 0)
    }
    
    if (hacks[7]) {
        mobs.applyEffect(REGENERATION, mobs.target(LOCAL_PLAYER), 3, 1)
        mobs.applyEffect(RESISTANCE, mobs.target(LOCAL_PLAYER), 3, 1)
    }
    
    if (hacks[9]) {
        apply_potion("slow_falling", 5, 0)
    }
    
    if (hacks[10]) {
        mobs.applyEffect(NIGHT_VISION, mobs.target(LOCAL_PLAYER), 20, 0)
    }
    
    if (hacks[11]) {
        apply_potion("haste", 5, 3)
    }
    
    if (hacks[12]) {
        mobs.applyEffect(SPEED, mobs.target(LOCAL_PLAYER), 5, 1)
    }
    
    if (hacks[13]) {
        mobs.applyEffect(FIRE_RESISTANCE, mobs.target(LOCAL_PLAYER), 5, 0)
    }
    
    loops.pause(1000)
})
//  ---------------- ONE-TIME UTILITIES ----------------
player.onChat("jump", function jump() {
    if (mobs.applyEffect(JUMP_BOOST, mobs.target(LOCAL_PLAYER), 15, 4)) {
        player.say("Jump Boost V (15 seconds)")
    } else {
        player.say("Jump command failed")
    }
    
})
player.onChat("speed", function speed() {
    if (mobs.applyEffect(SPEED, mobs.target(LOCAL_PLAYER), 60, 4)) {
        player.say("Speed V (60 seconds)")
    } else {
        player.say("Speed command failed")
    }
    
})
player.onChat("haste", function haste() {
    if (player.execute("effect @s haste 3600 4 true")) {
        player.say("Haste V (1 hour)")
    } else {
        player.say("Haste command failed")
    }
    
})
player.onChat("vision", function vision() {
    if (mobs.applyEffect(NIGHT_VISION, mobs.target(LOCAL_PLAYER), 99999, 0)) {
        player.say("Night Vision applied")
    } else {
        player.say("Night Vision failed")
    }
    
})
player.onChat("stopfx", function stopfx() {
    //  Explicit request to clear ALL effects.
    hacks[3] = false
    hacks[6] = false
    hacks[7] = false
    hacks[9] = false
    hacks[10] = false
    hacks[11] = false
    hacks[12] = false
    hacks[13] = false
    for (let index = 0; index < 6; index++) {
        z5_effect_modes[index] = false
    }
    player.execute("effect @s clear")
    player.say("All potion effects cleared")
})
player.onChat("fxcheck", function fxcheck() {
    player.say("=== POTION COMMAND DIAGNOSTICS ===")
    if (mobs.applyEffect(SPEED, mobs.target(LOCAL_PLAYER), 5, 0)) {
        player.say("PASS: Speed")
    } else {
        player.say("FAILED: Speed")
    }
    
    if (mobs.applyEffect(NIGHT_VISION, mobs.target(LOCAL_PLAYER), 5, 0)) {
        player.say("PASS: Night Vision")
    } else {
        player.say("FAILED: Night Vision")
    }
    
    if (mobs.applyEffect(FIRE_RESISTANCE, mobs.target(LOCAL_PLAYER), 5, 0)) {
        player.say("PASS: Fire Resistance")
    } else {
        player.say("FAILED: Fire Resistance")
    }
    
    if (apply_potion("haste", 5, 0)) {
        player.say("PASS: Haste")
    } else {
        player.say("FAILED: Haste")
    }
    
    if (apply_potion("slow_falling", 5, 0)) {
        player.say("PASS: Slow Falling")
    } else {
        player.say("FAILED: Slow Falling")
    }
    
    player.say("Test effects expire after 5 seconds")
})
player.onChat("check", function check() {
    if (player.execute("give @s dirt 1")) {
        player.say("Commands work. Received 1 dirt.")
    } else {
        player.say("Game command failed; check permissions.")
    }
    
})
player.onChat("diamonds", function diamonds() {
    let failed = 0
    for (let i = 0; i < 8; i++) {
        if (!player.execute("give @s diamond_block 64")) {
            failed = failed + 1
        }
        
        loops.pause(80)
    }
    if (failed == 0) {
        player.say("Requested 512 diamond blocks. Check space.")
    } else {
        player.say("Some diamond commands failed.")
    }
    
})
//  ---------------- ORBITAL STRIKE ----------------
//  20 rings separated by 5 blocks, 1000 UNIQUE TNT positions.
//  No programmed pauses. Spawns are sequential, not simultaneous.
//  Outer radius 100 blocks, target ~130 blocks ahead.
function spawn_payload(impact: any, east: number, north: number, height: number): boolean {
    return mobs.spawn(mobs.projectile(PRIMED_TNT), positions.add(impact, pos(east, height, north)))
}

player.onChat("nuketest", function nuketest() {
    let impact = positions.groundPosition(posCamera(0, 0, 130))
    if (spawn_payload(impact, 0, 0, 12)) {
        player.say("Nuke test: 1 TNT spawned at target.")
    } else {
        player.say("Nuke test failed; try loaded chunks.")
    }
    
})
player.onChat("nuke", function nuke() {
    let radius: number;
    let quantity: number;
    let angle: number;
    let east: number;
    let north: number;
    let spawned: boolean;
    if (nuke_busy[0]) {
        player.say("A strike is already in progress!")
        return
    }
    
    nuke_busy[0] = true
    let impact = positions.groundPosition(posCamera(0, 0, 130))
    mobs.spawn(mobs.projectile(LIGHTNING_BOLT), impact)
    player.say("ORBITAL STRIKE! 20 rings / 1000 TNT")
    player.say("One-shot: no stop; active TNT cannot be recalled.")
    let success_count = 0
    for (let ring = 0; ring < 20; ring++) {
        radius = (ring + 1) * 5
        quantity = ring_counts[ring]
        for (let i = 0; i < quantity; i++) {
            angle = 2 * Math.PI * i / quantity
            east = Math.round(radius * Math.cos(angle))
            north = Math.round(radius * Math.sin(angle))
            spawned = spawn_payload(impact, east, north, 12)
            if (spawned) {
                success_count = success_count + 1
            } else if (ring == 0 && i == 0) {
                //  Abort early if even the first target location fails.
                nuke_busy[0] = false
                player.say("First TNT failed; salvo canceled.")
                return
            }
            
        }
    }
    player.say("Strike result: " + ("" + success_count) + " of 1000 TNT")
    nuke_busy[0] = false
})
player.say("Zenith Client 5.0 loaded!")
player.say("Type help or newhelp for 100 new commands!")
//  ========================================================
//  100 NEW COMMANDS: ZENITH CLIENT 5.0
//  Every handler is a separate zero-argument function.
//  One-shot actions say they need no stop; toggles name stop.
//  These use ordinary Minecraft Education commands, not ESP.
//  ========================================================
let z5_effect_modes = [false, false, false, false, false, false]
player.onChat("invis", function z5_invis() {
    if (player.execute("effect @s invisibility 5 0 true")) {
        z5_effect_modes[0] = true
        player.say("invis ON. Stop: stopinvis")
    } else {
        player.say("invis failed; check cheats and version.")
    }
    
})
player.onChat("stopinvis", function z5_stopinvis() {
    z5_effect_modes[0] = false
    player.execute("effect @s clear invisibility")
    player.say("invis OFF")
})
player.onChat("breath", function z5_breath() {
    if (player.execute("effect @s water_breathing 5 0 true")) {
        z5_effect_modes[1] = true
        player.say("breath ON. Stop: stopbreath")
    } else {
        player.say("breath failed; check cheats and version.")
    }
    
})
player.onChat("stopbreath", function z5_stopbreath() {
    z5_effect_modes[1] = false
    player.execute("effect @s clear water_breathing")
    player.say("breath OFF")
})
player.onChat("absorb", function z5_absorb() {
    if (player.execute("effect @s absorption 5 0 true")) {
        z5_effect_modes[2] = true
        player.say("absorb ON. Stop: stopabsorb")
    } else {
        player.say("absorb failed; check cheats and version.")
    }
    
})
player.onChat("stopabsorb", function z5_stopabsorb() {
    z5_effect_modes[2] = false
    player.execute("effect @s clear absorption")
    player.say("absorb OFF")
})
player.onChat("hpboost", function z5_hpboost() {
    if (player.execute("effect @s health_boost 5 0 true")) {
        z5_effect_modes[3] = true
        player.say("hpboost ON. Stop: stophpboost")
    } else {
        player.say("hpboost failed; check cheats and version.")
    }
    
})
player.onChat("stophpboost", function z5_stophpboost() {
    z5_effect_modes[3] = false
    player.execute("effect @s clear health_boost")
    player.say("hpboost OFF")
})
player.onChat("dolphin", function z5_dolphin() {
    if (player.execute("effect @s dolphins_grace 5 0 true")) {
        z5_effect_modes[4] = true
        player.say("dolphin ON. Stop: stopdolphin")
    } else {
        player.say("dolphin failed; check cheats and version.")
    }
    
})
player.onChat("stopdolphin", function z5_stopdolphin() {
    z5_effect_modes[4] = false
    player.execute("effect @s clear dolphins_grace")
    player.say("dolphin OFF")
})
player.onChat("conduit", function z5_conduit() {
    if (player.execute("effect @s conduit_power 5 0 true")) {
        z5_effect_modes[5] = true
        player.say("conduit ON. Stop: stopconduit")
    } else {
        player.say("conduit failed; check cheats and version.")
    }
    
})
player.onChat("stopconduit", function z5_stopconduit() {
    z5_effect_modes[5] = false
    player.execute("effect @s clear conduit_power")
    player.say("conduit OFF")
})
player.onChat("keepinv", function z5_keepinv() {
    if (player.execute("gamerule keepinventory true")) {
        player.say("keepinv ON (worldwide). Stop: stopkeepinv")
    } else {
        player.say("keepinv failed; requires world permissions.")
    }
    
})
player.onChat("stopkeepinv", function z5_stopkeepinv() {
    if (player.execute("gamerule keepinventory false")) {
        player.say("keepinv OFF: keepinventory set to false")
    } else {
        player.say("World gamerule change failed.")
    }
    
})
player.onChat("timelock", function z5_timelock() {
    if (player.execute("gamerule dodaylightcycle false")) {
        player.say("timelock ON (worldwide). Stop: stoptimelock")
    } else {
        player.say("timelock failed; requires world permissions.")
    }
    
})
player.onChat("stoptimelock", function z5_stoptimelock() {
    if (player.execute("gamerule dodaylightcycle true")) {
        player.say("timelock OFF: dodaylightcycle set to true")
    } else {
        player.say("World gamerule change failed.")
    }
    
})
player.onChat("spawnlock", function z5_spawnlock() {
    if (player.execute("gamerule domobspawning false")) {
        player.say("spawnlock ON (worldwide). Stop: stopspawnlock")
    } else {
        player.say("spawnlock failed; requires world permissions.")
    }
    
})
player.onChat("stopspawnlock", function z5_stopspawnlock() {
    if (player.execute("gamerule domobspawning true")) {
        player.say("spawnlock OFF: domobspawning set to true")
    } else {
        player.say("World gamerule change failed.")
    }
    
})
player.onChat("firesafe", function z5_firesafe() {
    if (player.execute("gamerule dofiretick false")) {
        player.say("firesafe ON (worldwide). Stop: stopfiresafe")
    } else {
        player.say("firesafe failed; requires world permissions.")
    }
    
})
player.onChat("stopfiresafe", function z5_stopfiresafe() {
    if (player.execute("gamerule dofiretick true")) {
        player.say("firesafe OFF: dofiretick set to true")
    } else {
        player.say("World gamerule change failed.")
    }
    
})
player.onChat("weatherlock", function z5_weatherlock() {
    if (player.execute("gamerule doweathercycle false")) {
        player.say("weatherlock ON (worldwide). Stop: stopweatherlock")
    } else {
        player.say("weatherlock failed; requires world permissions.")
    }
    
})
player.onChat("stopweatherlock", function z5_stopweatherlock() {
    if (player.execute("gamerule doweathercycle true")) {
        player.say("weatherlock OFF: doweathercycle set to true")
    } else {
        player.say("World gamerule change failed.")
    }
    
})
player.onChat("griefguard", function z5_griefguard() {
    if (player.execute("gamerule mobgriefing false")) {
        player.say("griefguard ON (worldwide). Stop: stopgriefguard")
    } else {
        player.say("griefguard failed; requires world permissions.")
    }
    
})
player.onChat("stopgriefguard", function z5_stopgriefguard() {
    if (player.execute("gamerule mobgriefing true")) {
        player.say("griefguard OFF: mobgriefing set to true")
    } else {
        player.say("World gamerule change failed.")
    }
    
})
loops.forever(function z5_refresh_effects() {
    for (let i = 0; i < 6; i++) {
        if (z5_effect_modes[i]) {
            if (i == 0) {
                player.execute("effect @s invisibility 5 0 true")
            } else if (i == 1) {
                player.execute("effect @s water_breathing 5 0 true")
            } else if (i == 2) {
                player.execute("effect @s absorption 5 0 true")
            } else if (i == 3) {
                player.execute("effect @s health_boost 5 0 true")
            } else if (i == 4) {
                player.execute("effect @s dolphins_grace 5 0 true")
            } else if (i == 5) {
                player.execute("effect @s conduit_power 5 0 true")
            }
            
        }
        
    }
    loops.pause(1000)
})
player.onChat("heal", function z5_heal() {
    if (player.execute("effect @s instant_health 1 3 true")) {
        player.say("heal applied (1s). Stop: stopfx")
    } else {
        player.say("heal failed.")
    }
    
})
player.onChat("feed", function z5_feed() {
    if (player.execute("effect @s saturation 1 2 true")) {
        player.say("feed applied (1s). Stop: stopfx")
    } else {
        player.say("feed failed.")
    }
    
})
player.onChat("regenburst", function z5_regenburst() {
    if (player.execute("effect @s regeneration 20 3 true")) {
        player.say("regenburst applied (20s). Stop: stopfx")
    } else {
        player.say("regenburst failed.")
    }
    
})
player.onChat("absorbmax", function z5_absorbmax() {
    if (player.execute("effect @s absorption 120 4 true")) {
        player.say("absorbmax applied (120s). Stop: stopfx")
    } else {
        player.say("absorbmax failed.")
    }
    
})
player.onChat("speedmax", function z5_speedmax() {
    if (player.execute("effect @s speed 60 4 true")) {
        player.say("speedmax applied (60s). Stop: stopfx")
    } else {
        player.say("speedmax failed.")
    }
    
})
player.onChat("speedlite", function z5_speedlite() {
    if (player.execute("effect @s speed 120 0 true")) {
        player.say("speedlite applied (120s). Stop: stopfx")
    } else {
        player.say("speedlite failed.")
    }
    
})
player.onChat("jumpmax", function z5_jumpmax() {
    if (player.execute("effect @s jump_boost 30 4 true")) {
        player.say("jumpmax applied (30s). Stop: stopfx")
    } else {
        player.say("jumpmax failed.")
    }
    
})
player.onChat("jumplite", function z5_jumplite() {
    if (player.execute("effect @s jump_boost 120 0 true")) {
        player.say("jumplite applied (120s). Stop: stopfx")
    } else {
        player.say("jumplite failed.")
    }
    
})
player.onChat("might", function z5_might() {
    if (player.execute("effect @s strength 90 2 true")) {
        player.say("might applied (90s). Stop: stopfx")
    } else {
        player.say("might failed.")
    }
    
})
player.onChat("crit", function z5_crit() {
    if (player.execute("effect @s strength 60 4 true")) {
        player.say("crit applied (60s). Stop: stopfx")
    } else {
        player.say("crit failed.")
    }
    
})
player.onChat("mineboost", function z5_mineboost() {
    if (player.execute("effect @s haste 120 4 true")) {
        player.say("mineboost applied (120s). Stop: stopfx")
    } else {
        player.say("mineboost failed.")
    }
    
})
player.onChat("antifire", function z5_antifire() {
    if (player.execute("effect @s fire_resistance 120 0 true")) {
        player.say("antifire applied (120s). Stop: stopfx")
    } else {
        player.say("antifire failed.")
    }
    
})
player.onChat("darkcloak", function z5_darkcloak() {
    if (player.execute("effect @s invisibility 180 0 true") && player.execute("effect @s speed 180 0 true")) {
        player.say("darkcloak ON. Stop: stopfx")
    } else {
        player.say("darkcloak: one or more effects failed.")
    }
    
})
player.onChat("diver", function z5_diver() {
    if (player.execute("effect @s water_breathing 600 0 true") && player.execute("effect @s night_vision 600 0 true")) {
        player.say("diver ON. Stop: stopfx")
    } else {
        player.say("diver: one or more effects failed.")
    }
    
})
player.onChat("tank", function z5_tank() {
    if (player.execute("effect @s resistance 90 2 true") && player.execute("effect @s regeneration 60 1 true")) {
        player.say("tank ON. Stop: stopfx")
    } else {
        player.say("tank: one or more effects failed.")
    }
    
})
//  MINIMUM DISTANCE: this is measured from the issuing player.
//  @p[rm=0.1] can NEVER select the player at distance 0.
//  Excludes other players whose feet are within 0.1 block, too.
function z5_has_other(): boolean {
    return player.execute("testfor @p[rm=0.1]")
}

player.onChat("tpnear", function z5_tpnear() {
    if (!z5_has_other()) {
        player.say("No other player found. Nothing happened.")
    } else if (player.execute("tp @s @p[rm=0.1]")) {
        player.say("teleported to nearest OTHER player. One-shot; no stop needed.")
    } else {
        player.say("tpnear failed; check world permissions.")
    }
    
})
player.onChat("killnear", function z5_killnear() {
    if (!z5_has_other()) {
        player.say("No other player found. Nothing happened.")
    } else if (player.execute("kill @p[rm=0.1]")) {
        player.say("eliminated nearest OTHER player. One-shot; no stop needed.")
    } else {
        player.say("killnear failed; check world permissions.")
    }
    
})
player.onChat("bringnear", function z5_bringnear() {
    if (!z5_has_other()) {
        player.say("No other player found. Nothing happened.")
    } else if (player.execute("tp @p[rm=0.1] @s")) {
        player.say("teleported nearest OTHER player to you. One-shot; no stop needed.")
    } else {
        player.say("bringnear failed; check world permissions.")
    }
    
})
player.onChat("healnear", function z5_healnear() {
    if (!z5_has_other()) {
        player.say("No other player found. Nothing happened.")
    } else if (player.execute("effect @p[rm=0.1] instant_health 1 2 true")) {
        player.say("healed nearest OTHER player. One-shot; no stop needed.")
    } else {
        player.say("healnear failed; check world permissions.")
    }
    
})
player.onChat("boostnear", function z5_boostnear() {
    if (!z5_has_other()) {
        player.say("No other player found. Nothing happened.")
    } else if (player.execute("effect @p[rm=0.1] speed 60 2 true")) {
        player.say("boosted nearest OTHER player. Stop: clearnear (if same player is nearest).")
    } else {
        player.say("boostnear failed; check world permissions.")
    }
    
})
player.onChat("slownear", function z5_slownear() {
    if (!z5_has_other()) {
        player.say("No other player found. Nothing happened.")
    } else if (player.execute("effect @p[rm=0.1] slowness 15 3 true")) {
        player.say("slowed nearest OTHER player. Stop: clearnear (if same player is nearest).")
    } else {
        player.say("slownear failed; check world permissions.")
    }
    
})
player.onChat("blindnear", function z5_blindnear() {
    if (!z5_has_other()) {
        player.say("No other player found. Nothing happened.")
    } else if (player.execute("effect @p[rm=0.1] blindness 15 0 true")) {
        player.say("blinded nearest OTHER player. Stop: clearnear (if same player is nearest).")
    } else {
        player.say("blindnear failed; check world permissions.")
    }
    
})
player.onChat("weakennear", function z5_weakennear() {
    if (!z5_has_other()) {
        player.say("No other player found. Nothing happened.")
    } else if (player.execute("effect @p[rm=0.1] weakness 30 2 true")) {
        player.say("weakened nearest OTHER player. Stop: clearnear (if same player is nearest).")
    } else {
        player.say("weakennear failed; check world permissions.")
    }
    
})
player.onChat("levnear", function z5_levnear() {
    if (!z5_has_other()) {
        player.say("No other player found. Nothing happened.")
    } else if (player.execute("effect @p[rm=0.1] levitation 5 1 true")) {
        player.say("levitated nearest OTHER player. Stop: clearnear (if same player is nearest).")
    } else {
        player.say("levnear failed; check world permissions.")
    }
    
})
player.onChat("poisonnear", function z5_poisonnear() {
    if (!z5_has_other()) {
        player.say("No other player found. Nothing happened.")
    } else if (player.execute("effect @p[rm=0.1] poison 15 1 true")) {
        player.say("poisoned nearest OTHER player. Stop: clearnear (if same player is nearest).")
    } else {
        player.say("poisonnear failed; check world permissions.")
    }
    
})
player.onChat("clearnear", function z5_clearnear() {
    if (!z5_has_other()) {
        player.say("No other player found. Nothing happened.")
    } else if (player.execute("effect @p[rm=0.1] clear")) {
        player.say("cleared effects on nearest OTHER player. One-shot; no stop needed.")
    } else {
        player.say("clearnear failed; check world permissions.")
    }
    
})
player.onChat("gapples", function z5_gapples() {
    if (player.execute("give @s golden_apple 64")) {
        player.say("Given 64 golden_apple. One-shot; no stop needed.")
    } else {
        player.say("golden_apple unavailable or inventory full.")
    }
    
})
player.onChat("egapples", function z5_egapples() {
    if (player.execute("give @s enchanted_golden_apple 8")) {
        player.say("Given 8 enchanted_golden_apple. One-shot; no stop needed.")
    } else {
        player.say("enchanted_golden_apple unavailable or inventory full.")
    }
    
})
player.onChat("pearls2", function z5_pearls2() {
    if (player.execute("give @s ender_pearl 16")) {
        player.say("Given 16 ender_pearl. One-shot; no stop needed.")
    } else {
        player.say("ender_pearl unavailable or inventory full.")
    }
    
})
player.onChat("crystalstack", function z5_crystalstack() {
    if (player.execute("give @s end_crystal 64")) {
        player.say("Given 64 end_crystal. One-shot; no stop needed.")
    } else {
        player.say("end_crystal unavailable or inventory full.")
    }
    
})
player.onChat("totemstack", function z5_totemstack() {
    if (player.execute("give @s totem_of_undying 16")) {
        player.say("Given 16 totem_of_undying. One-shot; no stop needed.")
    } else {
        player.say("totem_of_undying unavailable or inventory full.")
    }
    
})
player.onChat("anchorstack", function z5_anchorstack() {
    if (player.execute("give @s respawn_anchor 64")) {
        player.say("Given 64 respawn_anchor. One-shot; no stop needed.")
    } else {
        player.say("respawn_anchor unavailable or inventory full.")
    }
    
})
player.onChat("glowstack", function z5_glowstack() {
    if (player.execute("give @s glowstone 64")) {
        player.say("Given 64 glowstone. One-shot; no stop needed.")
    } else {
        player.say("glowstone unavailable or inventory full.")
    }
    
})
player.onChat("obsistack", function z5_obsistack() {
    if (player.execute("give @s obsidian 64")) {
        player.say("Given 64 obsidian. One-shot; no stop needed.")
    } else {
        player.say("obsidian unavailable or inventory full.")
    }
    
})
player.onChat("webstack", function z5_webstack() {
    if (player.execute("give @s cobweb 64")) {
        player.say("Given 64 cobweb. One-shot; no stop needed.")
    } else {
        player.say("cobweb unavailable or inventory full.")
    }
    
})
player.onChat("tntstack", function z5_tntstack() {
    if (player.execute("give @s tnt 64")) {
        player.say("Given 64 tnt. One-shot; no stop needed.")
    } else {
        player.say("tnt unavailable or inventory full.")
    }
    
})
player.onChat("rockets", function z5_rockets() {
    if (player.execute("give @s firework_rocket 64")) {
        player.say("Given 64 firework_rocket. One-shot; no stop needed.")
    } else {
        player.say("firework_rocket unavailable or inventory full.")
    }
    
})
player.onChat("elytra", function z5_elytra() {
    if (player.execute("give @s elytra 1")) {
        player.say("Given 1 elytra. One-shot; no stop needed.")
    } else {
        player.say("elytra unavailable or inventory full.")
    }
    
})
player.onChat("trident", function z5_trident() {
    if (player.execute("give @s trident 1")) {
        player.say("Given 1 trident. One-shot; no stop needed.")
    } else {
        player.say("trident unavailable or inventory full.")
    }
    
})
player.onChat("bow", function z5_bow() {
    if (player.execute("give @s bow 1")) {
        player.say("Given 1 bow. One-shot; no stop needed.")
    } else {
        player.say("bow unavailable or inventory full.")
    }
    
})
player.onChat("crossbow", function z5_crossbow() {
    if (player.execute("give @s crossbow 1")) {
        player.say("Given 1 crossbow. One-shot; no stop needed.")
    } else {
        player.say("crossbow unavailable or inventory full.")
    }
    
})
player.onChat("shielditem", function z5_shielditem() {
    if (player.execute("give @s shield 1")) {
        player.say("Given 1 shield. One-shot; no stop needed.")
    } else {
        player.say("shield unavailable or inventory full.")
    }
    
})
player.onChat("arrowstack", function z5_arrowstack() {
    if (player.execute("give @s arrow 64")) {
        player.say("Given 64 arrow. One-shot; no stop needed.")
    } else {
        player.say("arrow unavailable or inventory full.")
    }
    
})
player.onChat("maceitem", function z5_maceitem() {
    if (player.execute("give @s mace 1")) {
        player.say("Given 1 mace. One-shot; no stop needed.")
    } else {
        player.say("mace unavailable or inventory full.")
    }
    
})
player.onChat("windstack", function z5_windstack() {
    if (player.execute("give @s wind_charge 64")) {
        player.say("Given 64 wind_charge. One-shot; no stop needed.")
    } else {
        player.say("wind_charge unavailable or inventory full.")
    }
    
})
player.onChat("snowstack", function z5_snowstack() {
    if (player.execute("give @s snowball 16")) {
        player.say("Given 16 snowball. One-shot; no stop needed.")
    } else {
        player.say("snowball unavailable or inventory full.")
    }
    
})
player.onChat("lava", function z5_lava() {
    if (player.execute("give @s lava_bucket 1")) {
        player.say("Given 1 lava_bucket. One-shot; no stop needed.")
    } else {
        player.say("lava_bucket unavailable or inventory full.")
    }
    
})
player.onChat("water", function z5_water() {
    if (player.execute("give @s water_bucket 1")) {
        player.say("Given 1 water_bucket. One-shot; no stop needed.")
    } else {
        player.say("water_bucket unavailable or inventory full.")
    }
    
})
player.onChat("mobcow", function z5_mobcow() {
    if (player.execute("summon cow ~ ~ ~5")) {
        player.say("Spawned cow. One-shot; no stop needed.")
    } else {
        player.say("Could not summon cow; check version/difficulty.")
    }
    
})
player.onChat("mobpig", function z5_mobpig() {
    if (player.execute("summon pig ~ ~ ~5")) {
        player.say("Spawned pig. One-shot; no stop needed.")
    } else {
        player.say("Could not summon pig; check version/difficulty.")
    }
    
})
player.onChat("mobsheep", function z5_mobsheep() {
    if (player.execute("summon sheep ~ ~ ~5")) {
        player.say("Spawned sheep. One-shot; no stop needed.")
    } else {
        player.say("Could not summon sheep; check version/difficulty.")
    }
    
})
player.onChat("mobchicken", function z5_mobchicken() {
    if (player.execute("summon chicken ~ ~ ~5")) {
        player.say("Spawned chicken. One-shot; no stop needed.")
    } else {
        player.say("Could not summon chicken; check version/difficulty.")
    }
    
})
player.onChat("mobhorse", function z5_mobhorse() {
    if (player.execute("summon horse ~ ~ ~5")) {
        player.say("Spawned horse. One-shot; no stop needed.")
    } else {
        player.say("Could not summon horse; check version/difficulty.")
    }
    
})
player.onChat("mobwolf", function z5_mobwolf() {
    if (player.execute("summon wolf ~ ~ ~5")) {
        player.say("Spawned wolf. One-shot; no stop needed.")
    } else {
        player.say("Could not summon wolf; check version/difficulty.")
    }
    
})
player.onChat("mobcat", function z5_mobcat() {
    if (player.execute("summon cat ~ ~ ~5")) {
        player.say("Spawned cat. One-shot; no stop needed.")
    } else {
        player.say("Could not summon cat; check version/difficulty.")
    }
    
})
player.onChat("mobrabbit", function z5_mobrabbit() {
    if (player.execute("summon rabbit ~ ~ ~5")) {
        player.say("Spawned rabbit. One-shot; no stop needed.")
    } else {
        player.say("Could not summon rabbit; check version/difficulty.")
    }
    
})
player.onChat("mobvillager", function z5_mobvillager() {
    if (player.execute("summon villager ~ ~ ~5")) {
        player.say("Spawned villager. One-shot; no stop needed.")
    } else {
        player.say("Could not summon villager; check version/difficulty.")
    }
    
})
player.onChat("mobiron_golem", function z5_mobiron_golem() {
    if (player.execute("summon iron_golem ~ ~ ~5")) {
        player.say("Spawned iron_golem. One-shot; no stop needed.")
    } else {
        player.say("Could not summon iron_golem; check version/difficulty.")
    }
    
})
player.onChat("mobsnow_golem", function z5_mobsnow_golem() {
    if (player.execute("summon snow_golem ~ ~ ~5")) {
        player.say("Spawned snow_golem. One-shot; no stop needed.")
    } else {
        player.say("Could not summon snow_golem; check version/difficulty.")
    }
    
})
player.onChat("mobbee", function z5_mobbee() {
    if (player.execute("summon bee ~ ~ ~5")) {
        player.say("Spawned bee. One-shot; no stop needed.")
    } else {
        player.say("Could not summon bee; check version/difficulty.")
    }
    
})
player.onChat("mobfox", function z5_mobfox() {
    if (player.execute("summon fox ~ ~ ~5")) {
        player.say("Spawned fox. One-shot; no stop needed.")
    } else {
        player.say("Could not summon fox; check version/difficulty.")
    }
    
})
player.onChat("mobturtle", function z5_mobturtle() {
    if (player.execute("summon turtle ~ ~ ~5")) {
        player.say("Spawned turtle. One-shot; no stop needed.")
    } else {
        player.say("Could not summon turtle; check version/difficulty.")
    }
    
})
player.onChat("mobzombie", function z5_mobzombie() {
    if (player.execute("summon zombie ~ ~ ~5")) {
        player.say("Spawned zombie. One-shot; no stop needed.")
    } else {
        player.say("Could not summon zombie; check version/difficulty.")
    }
    
})
player.onChat("mobskeleton", function z5_mobskeleton() {
    if (player.execute("summon skeleton ~ ~ ~5")) {
        player.say("Spawned skeleton. One-shot; no stop needed.")
    } else {
        player.say("Could not summon skeleton; check version/difficulty.")
    }
    
})
player.onChat("mobcreeper", function z5_mobcreeper() {
    if (player.execute("summon creeper ~ ~ ~5")) {
        player.say("Spawned creeper. One-shot; no stop needed.")
    } else {
        player.say("Could not summon creeper; check version/difficulty.")
    }
    
})
player.onChat("mobspider", function z5_mobspider() {
    if (player.execute("summon spider ~ ~ ~5")) {
        player.say("Spawned spider. One-shot; no stop needed.")
    } else {
        player.say("Could not summon spider; check version/difficulty.")
    }
    
})
player.onChat("mobenderman", function z5_mobenderman() {
    if (player.execute("summon enderman ~ ~ ~5")) {
        player.say("Spawned enderman. One-shot; no stop needed.")
    } else {
        player.say("Could not summon enderman; check version/difficulty.")
    }
    
})
player.onChat("mobwitch", function z5_mobwitch() {
    if (player.execute("summon witch ~ ~ ~5")) {
        player.say("Spawned witch. One-shot; no stop needed.")
    } else {
        player.say("Could not summon witch; check version/difficulty.")
    }
    
})
player.onChat("day", function z5_day() {
    if (player.execute("time set 1000")) {
        player.say("day set. One-shot; change with another world command.")
    } else {
        player.say("day failed; check permissions.")
    }
    
})
player.onChat("noon", function z5_noon() {
    if (player.execute("time set 6000")) {
        player.say("noon set. One-shot; change with another world command.")
    } else {
        player.say("noon failed; check permissions.")
    }
    
})
player.onChat("sunset", function z5_sunset() {
    if (player.execute("time set 12000")) {
        player.say("sunset set. One-shot; change with another world command.")
    } else {
        player.say("sunset failed; check permissions.")
    }
    
})
player.onChat("night", function z5_night() {
    if (player.execute("time set 13000")) {
        player.say("night set. One-shot; change with another world command.")
    } else {
        player.say("night failed; check permissions.")
    }
    
})
player.onChat("midnight", function z5_midnight() {
    if (player.execute("time set 18000")) {
        player.say("midnight set. One-shot; change with another world command.")
    } else {
        player.say("midnight failed; check permissions.")
    }
    
})
player.onChat("sunrise", function z5_sunrise() {
    if (player.execute("time set 23000")) {
        player.say("sunrise set. One-shot; change with another world command.")
    } else {
        player.say("sunrise failed; check permissions.")
    }
    
})
player.onChat("clearweather", function z5_clearweather() {
    if (player.execute("weather clear")) {
        player.say("clearweather set. One-shot; change with another world command.")
    } else {
        player.say("clearweather failed; check permissions.")
    }
    
})
player.onChat("rain", function z5_rain() {
    if (player.execute("weather rain")) {
        player.say("rain set. One-shot; change with another world command.")
    } else {
        player.say("rain failed; check permissions.")
    }
    
})
player.onChat("thunder", function z5_thunder() {
    if (player.execute("weather thunder")) {
        player.say("thunder set. One-shot; change with another world command.")
    } else {
        player.say("thunder failed; check permissions.")
    }
    
})
player.onChat("peaceful", function z5_peaceful() {
    if (player.execute("difficulty peaceful")) {
        player.say("peaceful set. One-shot; change with another world command.")
    } else {
        player.say("peaceful failed; check permissions.")
    }
    
})
player.onChat("easy", function z5_easy() {
    if (player.execute("difficulty easy")) {
        player.say("easy set. One-shot; change with another world command.")
    } else {
        player.say("easy failed; check permissions.")
    }
    
})
player.onChat("hard", function z5_hard() {
    if (player.execute("difficulty hard")) {
        player.say("hard set. One-shot; change with another world command.")
    } else {
        player.say("hard failed; check permissions.")
    }
    
})
function z5_safe_teleport(dx: number, dy: number, dz: number): boolean {
    let destination = pos(dx, dy, dz)
    let head = pos(dx, dy + 1, dz)
    if (!blocks.testForBlock(AIR, destination)) {
        return false
    }
    
    if (!blocks.testForBlock(AIR, head)) {
        return false
    }
    
    return player.teleport(destination)
}

player.onChat("up10", function z5_up10() {
    if (z5_safe_teleport(0, 10, 0)) {
        player.say("up10: teleport complete. One-shot; no stop needed.")
    } else {
        player.say("up10: destination blocked or teleport failed.")
    }
    
})
player.onChat("up30", function z5_up30() {
    if (z5_safe_teleport(0, 30, 0)) {
        player.say("up30: teleport complete. One-shot; no stop needed.")
    } else {
        player.say("up30: destination blocked or teleport failed.")
    }
    
})
player.onChat("down5", function z5_down5() {
    if (z5_safe_teleport(0, -5, 0)) {
        player.say("down5: teleport complete. One-shot; no stop needed.")
    } else {
        player.say("down5: destination blocked or teleport failed.")
    }
    
})
player.onChat("north20", function z5_north20() {
    if (z5_safe_teleport(0, 0, -20)) {
        player.say("north20: teleport complete. One-shot; no stop needed.")
    } else {
        player.say("north20: destination blocked or teleport failed.")
    }
    
})
player.onChat("south20", function z5_south20() {
    if (z5_safe_teleport(0, 0, 20)) {
        player.say("south20: teleport complete. One-shot; no stop needed.")
    } else {
        player.say("south20: destination blocked or teleport failed.")
    }
    
})
player.onChat("east20", function z5_east20() {
    if (z5_safe_teleport(20, 0, 0)) {
        player.say("east20: teleport complete. One-shot; no stop needed.")
    } else {
        player.say("east20: destination blocked or teleport failed.")
    }
    
})
player.onChat("west20", function z5_west20() {
    if (z5_safe_teleport(-20, 0, 0)) {
        player.say("west20: teleport complete. One-shot; no stop needed.")
    } else {
        player.say("west20: destination blocked or teleport failed.")
    }
    
})
player.onChat("backstep", function z5_backstep() {
    let destination = posCamera(0, 0, -8)
    let head = posCamera(0, 1, -8)
    if (blocks.testForBlock(AIR, destination) && blocks.testForBlock(AIR, head)) {
        if (player.teleport(destination)) {
            player.say("Backstep complete. One-shot; no stop needed.")
        } else {
            player.say("Backstep teleport failed.")
        }
        
    } else {
        player.say("Backstep destination blocked.")
    }
    
})
player.onChat("newhelp", function z5_newhelp() {
    player.say("=== ZENITH 5.0: 100 NEW COMMANDS ===")
    player.say("Use modeshelp, buffshelp, targetshelp")
    player.say("Use itemshelp, mobshelp, worldhelp")
    player.say("Use travelhelp for movement commands")
    player.say("Toggle commands tell you the stop word.")
    player.say("One-shot commands need no stop.")
})
player.onChat("buffshelp", function z5_menu_buffs() {
    player.say("--- BUFFS (15) ---")
    player.say("heal / feed / regenburst / absorbmax")
    player.say("speedmax / speedlite / jumpmax / jumplite")
    player.say("might / crit / mineboost / antifire")
    player.say("darkcloak / diver / tank")
})
player.onChat("targetshelp", function z5_menu_targets() {
    player.say("--- TARGETS (11) ---")
    player.say("tpnear / killnear / bringnear / healnear")
    player.say("boostnear / slownear / blindnear / weakennear")
    player.say("levnear / poisonnear / clearnear")
})
player.onChat("itemshelp", function z5_menu_items() {
    player.say("--- ITEMS (22) ---")
    player.say("gapples / egapples / pearls2 / crystalstack")
    player.say("totemstack / anchorstack / glowstack / obsistack")
    player.say("webstack / tntstack / rockets / elytra")
    player.say("trident / bow / crossbow / shielditem")
    player.say("arrowstack / maceitem / windstack / snowstack")
    player.say("lava / water")
})
player.onChat("mobshelp", function z5_menu_mobs() {
    player.say("--- MOBS (20) ---")
    player.say("mobcow / mobpig / mobsheep / mobchicken")
    player.say("mobhorse / mobwolf / mobcat / mobrabbit")
    player.say("mobvillager / mobiron_golem / mobsnow_golem / mobbee")
    player.say("mobfox / mobturtle / mobzombie / mobskeleton")
    player.say("mobcreeper / mobspider / mobenderman / mobwitch")
})
player.onChat("worldhelp", function z5_menu_world() {
    player.say("--- WORLD (12) ---")
    player.say("day / noon / sunset / night")
    player.say("midnight / sunrise / clearweather / rain")
    player.say("thunder / peaceful / easy / hard")
})
player.onChat("travelhelp", function z5_menu_travel() {
    player.say("--- TRAVEL (8) ---")
    player.say("up10 / up30 / down5 / north20")
    player.say("south20 / east20 / west20 / backstep")
})
player.onChat("modeshelp", function z5_menu_modes() {
    player.say("--- MODES (12) ---")
    player.say("invis / breath / absorb / hpboost")
    player.say("dolphin / conduit / keepinv / timelock")
    player.say("spawnlock / firesafe / weatherlock / griefguard")
    player.say("ON spells print their OFF command.")
    player.say("World rules affect the entire world.")
})
