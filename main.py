# ZENITH CLIENT 5.0 - 100 EXTRA COMMANDS
# Minecraft Education / MakeCode Python
# No external mod, injector, or resource pack required.
# Type help in Minecraft chat. All chat commands use zero arguments.
# Use only in a world you own or have permission to modify.

# 0 Zeus, 1 TP, 2 Fly, 3 Aura, 4 Spider, 5 Phase,
# 6 Wings, 7 Shield, 8 Scaffold, 9 NoFall, 10 Fullbright,
# 11 FastMine, 12 SprintAssist, 13 Fireproof.
hacks = [False, False, False, False, False, False, False,
         False, False, False, False, False, False, False]
zeus_seconds = [0]
nuke_busy = [False]
kit_step = [-1]
kit_enchant_index = [0]
kit_ready = [False]
home_set = [False]
home_location = [player.position()]

gear_names = ["Helmet", "Chestplate", "Leggings", "Boots",
              "Sword", "Axe", "Pickaxe", "Mace"]
gear_ids = ["netherite_helmet", "netherite_chestplate",
            "netherite_leggings", "netherite_boots", "netherite_sword",
            "netherite_axe", "netherite_pickaxe", "mace"]
supplies = [
    "give @p oak_planks 64", "give @p oak_planks 64",
    "give @s totem_of_undying 15",
    "give @s end_crystal 64", "give @s end_crystal 64",
    "give @s ender_pearl 16", "give @s ender_pearl 16",
    "give @s wind_charge 64",
    "give @s respawn_anchor 64", "give @s respawn_anchor 64",
    "give @s glowstone 64", "give @s glowstone 64",
    "give @s obsidian 64", "give @s obsidian 64"
]
ring_counts = [5, 10, 14, 19, 24, 29, 33, 38, 43, 48,
               52, 57, 62, 67, 71, 76, 81, 86, 90, 95]

# ---------------- CHAT MENUS ----------------
def help_menu():
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


def help_upper():
    help_menu()


def help_lower():
    help_menu()


def modules_menu():
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


player.on_chat("Help", help_upper)
player.on_chat("help", help_lower)
player.on_chat("modules", modules_menu)

# ---------------- KIT ENCHANTMENTS ----------------
def enchants_for(step):
    if step == 0:
        return ["protection 4", "unbreaking 3", "mending 1",
                "respiration 3", "aqua_affinity 1"]
    if step == 1 or step == 2:
        return ["protection 4", "unbreaking 3", "mending 1"]
    if step == 3:
        return ["protection 4", "unbreaking 3", "mending 1",
                "feather_falling 4", "depth_strider 3"]
    if step == 4:
        return ["sharpness 5", "unbreaking 3", "mending 1",
                "fire_aspect 2", "knockback 1"]
    if step == 5:
        return ["sharpness 5", "efficiency 5", "unbreaking 3",
                "mending 1"]
    if step == 6:
        return ["efficiency 5", "unbreaking 3", "mending 1",
                "fortune 3"]
    return ["breach 4", "unbreaking 3", "mending 1", "wind_burst 3"]


def is_holding_gear(step):
    # Bedrock 'hasitem' selector checks the exact mainhand item.
    # If your game lacks this selector, it will report a failed check.
    return player.execute("testfor @s[hasitem={item=" +
                          gear_ids[step] +
                          ",location=slot.weapon.mainhand}]")


def enchant_one(step):
    if not is_holding_gear(step):
        player.say("Hold your " + gear_names[step] + " first!")
        return
    failed = 0
    for enchantment in enchants_for(step):
        if not player.execute("enchant @s " + enchantment):
            failed = failed + 1
            player.say("Rejected: " + enchantment)
        loops.pause(80)
    if failed == 0:
        player.say("Enchanted " + gear_names[step] + "!")
    else:
        player.say("Some enchants rejected; inspect the item.")


def ench_help():
    player.say("Hold matching item before typing:")
    player.say("enchhelm enchchest enchlegs enchboots")
    player.say("enchsword enchaxe enchpick enchmace")
    player.say("Sword: Sharp V / Fire II / Knockback I")


def ench_helm():
    enchant_one(0)


def ench_chest():
    enchant_one(1)


def ench_legs():
    enchant_one(2)


def ench_boots():
    enchant_one(3)


def ench_sword():
    enchant_one(4)


def ench_axe():
    enchant_one(5)


def ench_pick():
    enchant_one(6)


def ench_mace():
    enchant_one(7)


player.on_chat("enchhelp", ench_help)
player.on_chat("enchhelm", ench_helm)
player.on_chat("enchchest", ench_chest)
player.on_chat("enchlegs", ench_legs)
player.on_chat("enchboots", ench_boots)
player.on_chat("enchsword", ench_sword)
player.on_chat("enchaxe", ench_axe)
player.on_chat("enchpick", ench_pick)
player.on_chat("enchmace", ench_mace)

# ---------------- GUIDED KIT ----------------
def give_current_gear():
    if kit_step[0] < 0 or kit_step[0] >= 8:
        return
    item = gear_ids[kit_step[0]]
    kit_ready[0] = player.execute("give @s " + item + " 1")
    if kit_ready[0]:
        player.say("Given " + gear_names[kit_step[0]] + ".")
        player.say("SELECT and HOLD it, then type next.")
    else:
        player.say("Give failed: " + item + ". Use kitretry/kitskip.")


def give_supplies():
    failed = 0
    for command in supplies:
        if not player.execute(command):
            failed = failed + 1
            player.say("Failed: " + command)
        loops.pause(80)
    if failed == 0:
        player.say("Supplies sent! Check inventory space.")
    else:
        player.say(str(failed) + " supply commands failed.")


def kit_start():
    if kit_step[0] >= 0:
        player.say("Kit in progress; type kitstatus.")
        return
    kit_step[0] = 0
    kit_enchant_index[0] = 0
    give_current_gear()


def advance_kit():
    kit_step[0] = kit_step[0] + 1
    kit_enchant_index[0] = 0
    kit_ready[0] = False
    if kit_step[0] >= 8:
        kit_step[0] = -1
        player.say("Gear done. Giving PvP supplies...")
        give_supplies()
        player.say("Kit finished. Check armor and enchantments!")
    else:
        give_current_gear()


def kit_next():
    if kit_step[0] < 0:
        player.say("Type kit to start.")
        return
    if not kit_ready[0]:
        player.say("Give failed. Use kitretry or kitskip.")
        return
    step = kit_step[0]
    if not is_holding_gear(step):
        player.say("Wrong held item. Select " + gear_names[step])
        return
    enchantments = enchants_for(step)
    for i in range(kit_enchant_index[0], len(enchantments)):
        if not player.execute("enchant @s " + enchantments[i]):
            kit_enchant_index[0] = i
            player.say("Rejected: " + enchantments[i])
            player.say("Type next to retry, or kitskip.")
            return
        kit_enchant_index[0] = i + 1
        loops.pause(80)
    player.say("Finished: " + gear_names[step])
    advance_kit()


def kit_status():
    if kit_step[0] < 0:
        player.say("Kit inactive. Type kit.")
    else:
        player.say("Hold " + gear_names[kit_step[0]] + " then next.")
        player.say("Progress: " + str(kit_step[0] + 1) + "/8 items")


def kit_retry():
    if kit_step[0] < 0:
        player.say("Kit inactive.")
        return
    # A new, unenchanted item must restart the enchantment sequence.
    kit_enchant_index[0] = 0
    give_current_gear()


def kit_skip():
    if kit_step[0] < 0:
        player.say("Kit inactive.")
        return
    player.say("Skipped: " + gear_names[kit_step[0]])
    advance_kit()


def kit_cancel():
    kit_step[0] = -1
    kit_ready[0] = False
    kit_enchant_index[0] = 0
    player.say("Kit canceled. Already-given items remain.")


def supplies_only():
    give_supplies()


player.on_chat("kit", kit_start)
player.on_chat("next", kit_next)
player.on_chat("kitstatus", kit_status)
player.on_chat("kitretry", kit_retry)
player.on_chat("kitskip", kit_skip)
player.on_chat("kitcancel", kit_cancel)
player.on_chat("supplies", supplies_only)

# ---------------- BASE MODULE TOGGLES ----------------
def zeus_on():
    hacks[0] = True
    zeus_seconds[0] = 30
    player.say("Zeus ON (30s)")
    player.say("Stop with: stopzeus")


def zeus_off():
    hacks[0] = False
    zeus_seconds[0] = 0
    player.say("Zeus OFF")


def aura_on():
    hacks[3] = True
    player.say("Aura Strength II ON (not auto-attack)")
    player.say("Stop with: stopaura")


def aura_off():
    hacks[3] = False
    player.execute("effect @s clear strength")
    player.say("Aura OFF")


def shield_on():
    hacks[7] = True
    player.say("Regen/Resistance Shield ON")
    player.say("Stop with: stopshield")


def shield_off():
    hacks[7] = False
    player.execute("effect @s clear regeneration")
    player.execute("effect @s clear resistance")
    player.say("Shield OFF")


def tp_on():
    hacks[1] = True
    player.say("Blink ready. Type blink.")
    player.say("Stop with: stoptp")


def tp_off():
    hacks[1] = False
    player.say("Blink OFF")


def move_forward(blocks_ahead):
    destination = pos_camera(0, 0, blocks_ahead)
    head = pos_camera(0, 1, blocks_ahead)
    if blocks.test_for_block(AIR, destination) and blocks.test_for_block(AIR, head):
        return player.teleport(destination)
    return False


def blink():
    if not hacks[1]:
        player.say("Enable tp first.")
    elif move_forward(6):
        player.say("Blink! One-shot; no stop needed.")
    else:
        player.say("Destination blocked or teleport failed.")


def fly_on():
    if player.execute("ability @s mayfly true"):
        hacks[2] = True
        player.say("Flight ON. Double-tap Jump.")
        player.say("Stop with: stopfly")
    else:
        player.say("Flight unavailable: check world permissions.")


def fly_off():
    if player.execute("ability @s mayfly false"):
        hacks[2] = False
        player.say("Flight OFF; land safely.")
    else:
        player.say("Flight disable failed.")


def spider_on():
    hacks[4] = True
    player.say("Spider assist ON (face wall)")
    player.say("Stop with: stopspider")


def spider_off():
    hacks[4] = False
    player.say("Spider assist OFF")


def phase_on():
    hacks[5] = True
    player.say("Phase dash ready: type phasego")
    player.say("Stop with: stopphase")


def phase_off():
    hacks[5] = False
    player.say("Phase dash OFF")


def phase_go():
    if not hacks[5]:
        player.say("Enable phase first.")
    elif move_forward(4):
        player.say("Dash! One-shot; no stop needed.")
    else:
        player.say("Destination blocked or teleport failed.")


def wings_on():
    hacks[6] = True
    player.say("Wings levitation ON (not actual Elytra)")
    player.say("Stop with: stopwings")


def wings_off():
    hacks[6] = False
    player.execute("effect @s clear levitation")
    player.say("Wings levitation OFF")


player.on_chat("zeus", zeus_on)
player.on_chat("stopzeus", zeus_off)
player.on_chat("aura", aura_on)
player.on_chat("stopaura", aura_off)
player.on_chat("shield", shield_on)
player.on_chat("stopshield", shield_off)
player.on_chat("tp", tp_on)
player.on_chat("stoptp", tp_off)
player.on_chat("blink", blink)
player.on_chat("fly", fly_on)
player.on_chat("stopfly", fly_off)
player.on_chat("spider", spider_on)
player.on_chat("stopspider", spider_off)
player.on_chat("phase", phase_on)
player.on_chat("stopphase", phase_off)
player.on_chat("phasego", phase_go)
player.on_chat("wings", wings_on)
player.on_chat("stopwings", wings_off)

# ---------------- NEW VAPE/HORION-INSPIRED UTILITIES ----------------
def apply_potion(effect_name, seconds, amplifier):
    return player.execute("effect @s " + effect_name + " " +
                          str(seconds) + " " + str(amplifier) + " true")


# ZENITH CLIENT 4.2.3 - FAST PREFILL SCAFFOLD
# One KEEP fill replaces many individual place/test calls.
# Builds at a fixed height, 12 blocks ahead, with a side margin.
# It preserves existing terrain and blocks. It may make broad
# rectangular glass platforms when you face diagonally.
scaffold_level = [0]
scaffold_blocks = [0]   # Count fill operations, not individual blocks.
scaffold_last_x = [9999999]
scaffold_last_z = [9999999]
scaffold_last_dir = [9999999]


def lock_scaffold_level():
    scaffold_level[0] = Math.floor(player.position().get_value(Axis.Y)) - 1


def forget_scaffold_position():
    scaffold_last_x[0] = 9999999
    scaffold_last_z[0] = 9999999
    scaffold_last_dir[0] = 9999999


def build_scaffold_platform():
    current = player.position()
    x0 = Math.floor(current.get_value(Axis.X))
    z0 = Math.floor(current.get_value(Axis.Z))
    heading_degrees = player.get_orientation()
    direction = Math.round(heading_degrees / 15)

    # Do not resend an identical fill while standing still.
    if x0 == scaffold_last_x[0] and z0 == scaffold_last_z[0] and direction == scaffold_last_dir[0]:
        return False

    angle = heading_degrees * Math.PI / 180
    far_x = x0 + Math.round(-Math.sin(angle) * 12)
    far_z = z0 + Math.round(Math.cos(angle) * 12)

    # KEEP changes AIR only. Each corner is an absolute world pos.
    low_x = Math.min(x0, far_x) - 1
    high_x = Math.max(x0, far_x) + 1
    low_z = Math.min(z0, far_z) - 1
    high_z = Math.max(z0, far_z) + 1
    first_corner = world(low_x, scaffold_level[0], low_z)
    last_corner = world(high_x, scaffold_level[0], high_z)

    blocks.fill(GLASS, first_corner, last_corner, FillOperation.KEEP)
    scaffold_last_x[0] = x0
    scaffold_last_z[0] = z0
    scaffold_last_dir[0] = direction
    scaffold_blocks[0] = scaffold_blocks[0] + 1
    return True


def scaffold_on():
    lock_scaffold_level()
    forget_scaffold_position()
    scaffold_blocks[0] = 0
    hacks[8] = True
    build_scaffold_platform()
    player.say("FAST Scaffold ON: 12-block prebuild!")
    player.say("Stop with: stopscaffold")
    player.say("Bridge height: " + str(scaffold_level[0]))


def scaffold_off():
    hacks[8] = False
    player.say("Scaffold OFF; glass remains.")
    player.say("Fill operations: " + str(scaffold_blocks[0]))


def scaffold_reset():
    lock_scaffold_level()
    forget_scaffold_position()
    player.say("Scaffold Y reset: " + str(scaffold_level[0]))
    if hacks[8]:
        build_scaffold_platform()


def scaffold_test():
    lock_scaffold_level()
    forget_scaffold_position()
    build_scaffold_platform()
    player.say("Test: 12 blocks ahead, KEEP fill requested.")
    player.say("Look ahead for the glass platform.")


def fast_scaffold_loop():
    if hacks[8]:
        build_scaffold_platform()
    loops.pause(50)


loops.forever(fast_scaffold_loop)

def nofall_on():
    hacks[9] = True
    if apply_potion("slow_falling", 5, 0):
        player.say("NoFall ON: Slow Falling")
        player.say("Stop with: stopnofall")
    else:
        player.say("NoFall failed; check game commands")


def nofall_off():
    hacks[9] = False
    player.execute("effect @s clear slow_falling")
    player.say("NoFall OFF")


def bright_on():
    hacks[10] = True
    if mobs.apply_effect(NIGHT_VISION, mobs.target(LOCAL_PLAYER), 20, 0):
        player.say("Fullbright ON: Night Vision")
        player.say("Stop with: stopbright")
    else:
        player.say("Fullbright failed")


def bright_off():
    hacks[10] = False
    player.execute("effect @s clear night_vision")
    player.say("Fullbright OFF")


def fastmine_on():
    hacks[11] = True
    if apply_potion("haste", 5, 3):
        player.say("FastMine ON: Haste IV")
        player.say("Stop with: stopmine")
    else:
        player.say("FastMine failed")


def fastmine_off():
    hacks[11] = False
    player.execute("effect @s clear haste")
    player.say("FastMine OFF")


def sprint_on():
    hacks[12] = True
    if mobs.apply_effect(SPEED, mobs.target(LOCAL_PLAYER), 5, 1):
        player.say("Sprint Assist ON: Speed II")
        player.say("Stop with: stopsprint")
    else:
        player.say("Sprint Assist failed")


def sprint_off():
    hacks[12] = False
    player.execute("effect @s clear speed")
    player.say("Sprint Assist OFF")


def fire_on():
    hacks[13] = True
    if mobs.apply_effect(FIRE_RESISTANCE, mobs.target(LOCAL_PLAYER), 5, 0):
        player.say("Fireproof ON")
        player.say("Stop with: stopfire")
    else:
        player.say("Fireproof failed")


def fire_off():
    hacks[13] = False
    player.execute("effect @s clear fire_resistance")
    player.say("Fireproof OFF")


def sethome():
    home_location[0] = player.position()
    home_set[0] = True
    player.say("Home saved for this code session.")


def go_home():
    if not home_set[0]:
        player.say("Type sethome first.")
    elif player.teleport(home_location[0]):
        player.say("Returned home!")
    else:
        player.say("Home teleport failed; check destination.")


def coords():
    player.say("Current XYZ:")
    player.say(player.position())


def status():
    names = ["Zeus", "TP", "Fly", "Aura", "Spider", "Phase", "Wings",
             "Shield", "Scaffold", "NoFall", "Bright", "FastMine",
             "Sprint", "Fireproof"]
    count = 0
    for i in range(len(hacks)):
        if hacks[i]:
            player.say("ON: " + names[i])
            count = count + 1
    if count == 0:
        player.say("No continuous modes active.")
    if kit_step[0] >= 0:
        player.say("Kit paused at " + gear_names[kit_step[0]])
    if hacks[8]:
        player.say("Scaffold fill operations: " + str(scaffold_blocks[0]))
    if nuke_busy[0]:
        player.say("Orbital strike in progress")


def disable_modes():
    for i in range(len(hacks)):
        hacks[i] = False
    zeus_seconds[0] = 0
    for index in range(6):
        z5_effect_modes[index] = False
    # Clear only the effects Zenith uses; not all unrelated potions.
    effect_names = ["strength", "regeneration", "resistance",
                    "levitation", "slow_falling", "night_vision",
                    "haste", "speed", "fire_resistance", "invisibility",
                    "water_breathing", "absorption", "health_boost",
                    "dolphins_grace", "conduit_power"]
    for effect_name in effect_names:
        player.execute("effect @s clear " + effect_name)
    player.execute("ability @s mayfly false")


def all_off():
    disable_modes()
    player.say("Potion/movement modes OFF. World rules unchanged.")
    player.say("Active TNT cannot be recalled.")


def panic():
    disable_modes()
    player.say("PANIC: movement/effects OFF; world rules unchanged.")
    player.say("Active TNT cannot be recalled!")


player.on_chat("scaffold", scaffold_on)
player.on_chat("scaffoldtest", scaffold_test)
player.on_chat("scaffoldreset", scaffold_reset)
player.on_chat("stopscaffold", scaffold_off)
player.on_chat("nofall", nofall_on)
player.on_chat("stopnofall", nofall_off)
player.on_chat("bright", bright_on)
player.on_chat("stopbright", bright_off)
player.on_chat("fastmine", fastmine_on)
player.on_chat("stopmine", fastmine_off)
player.on_chat("sprint", sprint_on)
player.on_chat("stopsprint", sprint_off)
player.on_chat("fireproof", fire_on)
player.on_chat("stopfire", fire_off)
player.on_chat("sethome", sethome)
player.on_chat("home", go_home)
player.on_chat("coords", coords)
player.on_chat("status", status)
player.on_chat("alloff", all_off)
player.on_chat("panic", panic)

# ---------------- CONTINUOUS MODES ----------------
def continuous_modes():
    if hacks[0]:
        mobs.spawn(mobs.projectile(LIGHTNING_BOLT), pos_camera(0, 0, 12))
        mobs.spawn(mobs.projectile(LIGHTNING_BOLT), pos_camera(0, 0, 20))
        zeus_seconds[0] = zeus_seconds[0] - 1
        if zeus_seconds[0] <= 0:
            hacks[0] = False
            player.say("Zeus timer finished")

    if hacks[3]:
        mobs.apply_effect(STRENGTH, mobs.target(LOCAL_PLAYER), 3, 1)
    if hacks[4]:
        # Does not move you if the two blocks above are occupied.
        if not blocks.test_for_block(AIR, pos_camera(0, 1, 1)):
            if blocks.test_for_block(AIR, pos(0, 2, 0)) and blocks.test_for_block(AIR, pos(0, 3, 0)):
                player.teleport(pos(0, 1, 0))
    if hacks[6]:
        mobs.apply_effect(LEVITATION, mobs.target(LOCAL_PLAYER), 3, 0)
    if hacks[7]:
        mobs.apply_effect(REGENERATION, mobs.target(LOCAL_PLAYER), 3, 1)
        mobs.apply_effect(RESISTANCE, mobs.target(LOCAL_PLAYER), 3, 1)
    if hacks[9]:
        apply_potion("slow_falling", 5, 0)
    if hacks[10]:
        mobs.apply_effect(NIGHT_VISION, mobs.target(LOCAL_PLAYER), 20, 0)
    if hacks[11]:
        apply_potion("haste", 5, 3)
    if hacks[12]:
        mobs.apply_effect(SPEED, mobs.target(LOCAL_PLAYER), 5, 1)
    if hacks[13]:
        mobs.apply_effect(FIRE_RESISTANCE, mobs.target(LOCAL_PLAYER), 5, 0)

    loops.pause(1000)


loops.forever(continuous_modes)

# ---------------- ONE-TIME UTILITIES ----------------
def jump():
    if mobs.apply_effect(JUMP_BOOST, mobs.target(LOCAL_PLAYER), 15, 4):
        player.say("Jump Boost V (15 seconds)")
    else:
        player.say("Jump command failed")


def speed():
    if mobs.apply_effect(SPEED, mobs.target(LOCAL_PLAYER), 60, 4):
        player.say("Speed V (60 seconds)")
    else:
        player.say("Speed command failed")


def haste():
    if player.execute("effect @s haste 3600 4 true"):
        player.say("Haste V (1 hour)")
    else:
        player.say("Haste command failed")


def vision():
    if mobs.apply_effect(NIGHT_VISION, mobs.target(LOCAL_PLAYER), 99999, 0):
        player.say("Night Vision applied")
    else:
        player.say("Night Vision failed")


def fxcheck():
    player.say("=== POTION COMMAND DIAGNOSTICS ===")
    if mobs.apply_effect(SPEED, mobs.target(LOCAL_PLAYER), 5, 0):
        player.say("PASS: Speed")
    else:
        player.say("FAILED: Speed")
    if mobs.apply_effect(NIGHT_VISION, mobs.target(LOCAL_PLAYER), 5, 0):
        player.say("PASS: Night Vision")
    else:
        player.say("FAILED: Night Vision")
    if mobs.apply_effect(FIRE_RESISTANCE, mobs.target(LOCAL_PLAYER), 5, 0):
        player.say("PASS: Fire Resistance")
    else:
        player.say("FAILED: Fire Resistance")
    if apply_potion("haste", 5, 0):
        player.say("PASS: Haste")
    else:
        player.say("FAILED: Haste")
    if apply_potion("slow_falling", 5, 0):
        player.say("PASS: Slow Falling")
    else:
        player.say("FAILED: Slow Falling")
    player.say("Test effects expire after 5 seconds")


def stopfx():
    # Explicit request to clear ALL effects.
    hacks[3] = False
    hacks[6] = False
    hacks[7] = False
    hacks[9] = False
    hacks[10] = False
    hacks[11] = False
    hacks[12] = False
    hacks[13] = False
    for index in range(6):
        z5_effect_modes[index] = False
    player.execute("effect @s clear")
    player.say("All potion effects cleared")


def check():
    if player.execute("give @s dirt 1"):
        player.say("Commands work. Received 1 dirt.")
    else:
        player.say("Game command failed; check permissions.")


def diamonds():
    failed = 0
    for i in range(8):
        if not player.execute("give @s diamond_block 64"):
            failed = failed + 1
        loops.pause(80)
    if failed == 0:
        player.say("Requested 512 diamond blocks. Check space.")
    else:
        player.say("Some diamond commands failed.")


player.on_chat("jump", jump)
player.on_chat("speed", speed)
player.on_chat("haste", haste)
player.on_chat("vision", vision)
player.on_chat("stopfx", stopfx)
player.on_chat("fxcheck", fxcheck)
player.on_chat("check", check)
player.on_chat("diamonds", diamonds)

# ---------------- ORBITAL STRIKE ----------------
# 20 rings separated by 5 blocks, 1000 UNIQUE TNT positions.
# No programmed pauses. Spawns are sequential, not simultaneous.
# Outer radius 100 blocks, target ~130 blocks ahead.

def spawn_payload(impact, east, north, height):
    return mobs.spawn(mobs.projectile(PRIMED_TNT),
                      positions.add(impact, pos(east, height, north)))


def nuketest():
    impact = positions.ground_position(pos_camera(0, 0, 130))
    if spawn_payload(impact, 0, 0, 12):
        player.say("Nuke test: 1 TNT spawned at target.")
    else:
        player.say("Nuke test failed; try loaded chunks.")


def nuke():
    if nuke_busy[0]:
        player.say("A strike is already in progress!")
        return
    nuke_busy[0] = True
    impact = positions.ground_position(pos_camera(0, 0, 130))
    mobs.spawn(mobs.projectile(LIGHTNING_BOLT), impact)
    player.say("ORBITAL STRIKE! 20 rings / 1000 TNT")
    player.say("One-shot: no stop; active TNT cannot be recalled.")
    success_count = 0
    for ring in range(20):
        radius = (ring + 1) * 5
        quantity = ring_counts[ring]
        for i in range(quantity):
            angle = 2 * Math.PI * i / quantity
            east = Math.round(radius * Math.cos(angle))
            north = Math.round(radius * Math.sin(angle))
            spawned = spawn_payload(impact, east, north, 12)
            if spawned:
                success_count = success_count + 1
            elif ring == 0 and i == 0:
                # Abort early if even the first target location fails.
                nuke_busy[0] = False
                player.say("First TNT failed; salvo canceled.")
                return
    player.say("Strike result: " + str(success_count) + " of 1000 TNT")
    nuke_busy[0] = False


player.on_chat("nuketest", nuketest)
player.on_chat("nuke", nuke)

player.say("Zenith Client 5.0 loaded!")
player.say("Type help or newhelp for 100 new commands!")

# ========================================================
# 100 NEW COMMANDS: ZENITH CLIENT 5.0
# Every handler is a separate zero-argument function.
# One-shot actions say they need no stop; toggles name stop.
# These use ordinary Minecraft Education commands, not ESP.
# ========================================================

z5_effect_modes = [False, False, False, False, False, False]

def z5_invis():
    if player.execute("effect @s invisibility 5 0 true"):
        z5_effect_modes[0] = True
        player.say("invis ON. Stop: stopinvis")
    else:
        player.say("invis failed; check cheats and version.")

player.on_chat("invis", z5_invis)

def z5_stopinvis():
    z5_effect_modes[0] = False
    player.execute("effect @s clear invisibility")
    player.say("invis OFF")

player.on_chat("stopinvis", z5_stopinvis)

def z5_breath():
    if player.execute("effect @s water_breathing 5 0 true"):
        z5_effect_modes[1] = True
        player.say("breath ON. Stop: stopbreath")
    else:
        player.say("breath failed; check cheats and version.")

player.on_chat("breath", z5_breath)

def z5_stopbreath():
    z5_effect_modes[1] = False
    player.execute("effect @s clear water_breathing")
    player.say("breath OFF")

player.on_chat("stopbreath", z5_stopbreath)

def z5_absorb():
    if player.execute("effect @s absorption 5 0 true"):
        z5_effect_modes[2] = True
        player.say("absorb ON. Stop: stopabsorb")
    else:
        player.say("absorb failed; check cheats and version.")

player.on_chat("absorb", z5_absorb)

def z5_stopabsorb():
    z5_effect_modes[2] = False
    player.execute("effect @s clear absorption")
    player.say("absorb OFF")

player.on_chat("stopabsorb", z5_stopabsorb)

def z5_hpboost():
    if player.execute("effect @s health_boost 5 0 true"):
        z5_effect_modes[3] = True
        player.say("hpboost ON. Stop: stophpboost")
    else:
        player.say("hpboost failed; check cheats and version.")

player.on_chat("hpboost", z5_hpboost)

def z5_stophpboost():
    z5_effect_modes[3] = False
    player.execute("effect @s clear health_boost")
    player.say("hpboost OFF")

player.on_chat("stophpboost", z5_stophpboost)

def z5_dolphin():
    if player.execute("effect @s dolphins_grace 5 0 true"):
        z5_effect_modes[4] = True
        player.say("dolphin ON. Stop: stopdolphin")
    else:
        player.say("dolphin failed; check cheats and version.")

player.on_chat("dolphin", z5_dolphin)

def z5_stopdolphin():
    z5_effect_modes[4] = False
    player.execute("effect @s clear dolphins_grace")
    player.say("dolphin OFF")

player.on_chat("stopdolphin", z5_stopdolphin)

def z5_conduit():
    if player.execute("effect @s conduit_power 5 0 true"):
        z5_effect_modes[5] = True
        player.say("conduit ON. Stop: stopconduit")
    else:
        player.say("conduit failed; check cheats and version.")

player.on_chat("conduit", z5_conduit)

def z5_stopconduit():
    z5_effect_modes[5] = False
    player.execute("effect @s clear conduit_power")
    player.say("conduit OFF")

player.on_chat("stopconduit", z5_stopconduit)

def z5_keepinv():
    if player.execute("gamerule keepinventory true"):
        player.say("keepinv ON (worldwide). Stop: stopkeepinv")
    else:
        player.say("keepinv failed; requires world permissions.")

player.on_chat("keepinv", z5_keepinv)

def z5_stopkeepinv():
    if player.execute("gamerule keepinventory false"):
        player.say("keepinv OFF: keepinventory set to false")
    else:
        player.say("World gamerule change failed.")

player.on_chat("stopkeepinv", z5_stopkeepinv)

def z5_timelock():
    if player.execute("gamerule dodaylightcycle false"):
        player.say("timelock ON (worldwide). Stop: stoptimelock")
    else:
        player.say("timelock failed; requires world permissions.")

player.on_chat("timelock", z5_timelock)

def z5_stoptimelock():
    if player.execute("gamerule dodaylightcycle true"):
        player.say("timelock OFF: dodaylightcycle set to true")
    else:
        player.say("World gamerule change failed.")

player.on_chat("stoptimelock", z5_stoptimelock)

def z5_spawnlock():
    if player.execute("gamerule domobspawning false"):
        player.say("spawnlock ON (worldwide). Stop: stopspawnlock")
    else:
        player.say("spawnlock failed; requires world permissions.")

player.on_chat("spawnlock", z5_spawnlock)

def z5_stopspawnlock():
    if player.execute("gamerule domobspawning true"):
        player.say("spawnlock OFF: domobspawning set to true")
    else:
        player.say("World gamerule change failed.")

player.on_chat("stopspawnlock", z5_stopspawnlock)

def z5_firesafe():
    if player.execute("gamerule dofiretick false"):
        player.say("firesafe ON (worldwide). Stop: stopfiresafe")
    else:
        player.say("firesafe failed; requires world permissions.")

player.on_chat("firesafe", z5_firesafe)

def z5_stopfiresafe():
    if player.execute("gamerule dofiretick true"):
        player.say("firesafe OFF: dofiretick set to true")
    else:
        player.say("World gamerule change failed.")

player.on_chat("stopfiresafe", z5_stopfiresafe)

def z5_weatherlock():
    if player.execute("gamerule doweathercycle false"):
        player.say("weatherlock ON (worldwide). Stop: stopweatherlock")
    else:
        player.say("weatherlock failed; requires world permissions.")

player.on_chat("weatherlock", z5_weatherlock)

def z5_stopweatherlock():
    if player.execute("gamerule doweathercycle true"):
        player.say("weatherlock OFF: doweathercycle set to true")
    else:
        player.say("World gamerule change failed.")

player.on_chat("stopweatherlock", z5_stopweatherlock)

def z5_griefguard():
    if player.execute("gamerule mobgriefing false"):
        player.say("griefguard ON (worldwide). Stop: stopgriefguard")
    else:
        player.say("griefguard failed; requires world permissions.")

player.on_chat("griefguard", z5_griefguard)

def z5_stopgriefguard():
    if player.execute("gamerule mobgriefing true"):
        player.say("griefguard OFF: mobgriefing set to true")
    else:
        player.say("World gamerule change failed.")

player.on_chat("stopgriefguard", z5_stopgriefguard)

def z5_refresh_effects():
    for i in range(6):
        if z5_effect_modes[i]:
            if i == 0:
                player.execute("effect @s invisibility 5 0 true")
            elif i == 1:
                player.execute("effect @s water_breathing 5 0 true")
            elif i == 2:
                player.execute("effect @s absorption 5 0 true")
            elif i == 3:
                player.execute("effect @s health_boost 5 0 true")
            elif i == 4:
                player.execute("effect @s dolphins_grace 5 0 true")
            elif i == 5:
                player.execute("effect @s conduit_power 5 0 true")
    loops.pause(1000)

loops.forever(z5_refresh_effects)

def z5_heal():
    if player.execute("effect @s instant_health 1 3 true"):
        player.say("heal applied (1s). Stop: stopfx")
    else:
        player.say("heal failed.")

player.on_chat("heal", z5_heal)

def z5_feed():
    if player.execute("effect @s saturation 1 2 true"):
        player.say("feed applied (1s). Stop: stopfx")
    else:
        player.say("feed failed.")

player.on_chat("feed", z5_feed)

def z5_regenburst():
    if player.execute("effect @s regeneration 20 3 true"):
        player.say("regenburst applied (20s). Stop: stopfx")
    else:
        player.say("regenburst failed.")

player.on_chat("regenburst", z5_regenburst)

def z5_absorbmax():
    if player.execute("effect @s absorption 120 4 true"):
        player.say("absorbmax applied (120s). Stop: stopfx")
    else:
        player.say("absorbmax failed.")

player.on_chat("absorbmax", z5_absorbmax)

def z5_speedmax():
    if player.execute("effect @s speed 60 4 true"):
        player.say("speedmax applied (60s). Stop: stopfx")
    else:
        player.say("speedmax failed.")

player.on_chat("speedmax", z5_speedmax)

def z5_speedlite():
    if player.execute("effect @s speed 120 0 true"):
        player.say("speedlite applied (120s). Stop: stopfx")
    else:
        player.say("speedlite failed.")

player.on_chat("speedlite", z5_speedlite)

def z5_jumpmax():
    if player.execute("effect @s jump_boost 30 4 true"):
        player.say("jumpmax applied (30s). Stop: stopfx")
    else:
        player.say("jumpmax failed.")

player.on_chat("jumpmax", z5_jumpmax)

def z5_jumplite():
    if player.execute("effect @s jump_boost 120 0 true"):
        player.say("jumplite applied (120s). Stop: stopfx")
    else:
        player.say("jumplite failed.")

player.on_chat("jumplite", z5_jumplite)

def z5_might():
    if player.execute("effect @s strength 90 2 true"):
        player.say("might applied (90s). Stop: stopfx")
    else:
        player.say("might failed.")

player.on_chat("might", z5_might)

def z5_crit():
    if player.execute("effect @s strength 60 4 true"):
        player.say("crit applied (60s). Stop: stopfx")
    else:
        player.say("crit failed.")

player.on_chat("crit", z5_crit)

def z5_mineboost():
    if player.execute("effect @s haste 120 4 true"):
        player.say("mineboost applied (120s). Stop: stopfx")
    else:
        player.say("mineboost failed.")

player.on_chat("mineboost", z5_mineboost)

def z5_antifire():
    if player.execute("effect @s fire_resistance 120 0 true"):
        player.say("antifire applied (120s). Stop: stopfx")
    else:
        player.say("antifire failed.")

player.on_chat("antifire", z5_antifire)

def z5_darkcloak():
    if player.execute("effect @s invisibility 180 0 true") and player.execute("effect @s speed 180 0 true"):
        player.say("darkcloak ON. Stop: stopfx")
    else:
        player.say("darkcloak: one or more effects failed.")

player.on_chat("darkcloak", z5_darkcloak)

def z5_diver():
    if player.execute("effect @s water_breathing 600 0 true") and player.execute("effect @s night_vision 600 0 true"):
        player.say("diver ON. Stop: stopfx")
    else:
        player.say("diver: one or more effects failed.")

player.on_chat("diver", z5_diver)

def z5_tank():
    if player.execute("effect @s resistance 90 2 true") and player.execute("effect @s regeneration 60 1 true"):
        player.say("tank ON. Stop: stopfx")
    else:
        player.say("tank: one or more effects failed.")

player.on_chat("tank", z5_tank)

# MINIMUM DISTANCE: this is measured from the issuing player.
# @p[rm=0.1] can NEVER select the player at distance 0.
# Excludes other players whose feet are within 0.1 block, too.
def z5_has_other():
    return player.execute("testfor @p[rm=0.1]")

def z5_tpnear():
    if not z5_has_other():
        player.say("No other player found. Nothing happened.")
    elif player.execute("tp @s @p[rm=0.1]"):
        player.say("teleported to nearest OTHER player. One-shot; no stop needed.")
    else:
        player.say("tpnear failed; check world permissions.")

player.on_chat("tpnear", z5_tpnear)

def z5_killnear():
    if not z5_has_other():
        player.say("No other player found. Nothing happened.")
    elif player.execute("kill @p[rm=0.1]"):
        player.say("eliminated nearest OTHER player. One-shot; no stop needed.")
    else:
        player.say("killnear failed; check world permissions.")

player.on_chat("killnear", z5_killnear)

def z5_bringnear():
    if not z5_has_other():
        player.say("No other player found. Nothing happened.")
    elif player.execute("tp @p[rm=0.1] @s"):
        player.say("teleported nearest OTHER player to you. One-shot; no stop needed.")
    else:
        player.say("bringnear failed; check world permissions.")

player.on_chat("bringnear", z5_bringnear)

def z5_healnear():
    if not z5_has_other():
        player.say("No other player found. Nothing happened.")
    elif player.execute("effect @p[rm=0.1] instant_health 1 2 true"):
        player.say("healed nearest OTHER player. One-shot; no stop needed.")
    else:
        player.say("healnear failed; check world permissions.")

player.on_chat("healnear", z5_healnear)

def z5_boostnear():
    if not z5_has_other():
        player.say("No other player found. Nothing happened.")
    elif player.execute("effect @p[rm=0.1] speed 60 2 true"):
        player.say("boosted nearest OTHER player. Stop: clearnear (if same player is nearest).")
    else:
        player.say("boostnear failed; check world permissions.")

player.on_chat("boostnear", z5_boostnear)

def z5_slownear():
    if not z5_has_other():
        player.say("No other player found. Nothing happened.")
    elif player.execute("effect @p[rm=0.1] slowness 15 3 true"):
        player.say("slowed nearest OTHER player. Stop: clearnear (if same player is nearest).")
    else:
        player.say("slownear failed; check world permissions.")

player.on_chat("slownear", z5_slownear)

def z5_blindnear():
    if not z5_has_other():
        player.say("No other player found. Nothing happened.")
    elif player.execute("effect @p[rm=0.1] blindness 15 0 true"):
        player.say("blinded nearest OTHER player. Stop: clearnear (if same player is nearest).")
    else:
        player.say("blindnear failed; check world permissions.")

player.on_chat("blindnear", z5_blindnear)

def z5_weakennear():
    if not z5_has_other():
        player.say("No other player found. Nothing happened.")
    elif player.execute("effect @p[rm=0.1] weakness 30 2 true"):
        player.say("weakened nearest OTHER player. Stop: clearnear (if same player is nearest).")
    else:
        player.say("weakennear failed; check world permissions.")

player.on_chat("weakennear", z5_weakennear)

def z5_levnear():
    if not z5_has_other():
        player.say("No other player found. Nothing happened.")
    elif player.execute("effect @p[rm=0.1] levitation 5 1 true"):
        player.say("levitated nearest OTHER player. Stop: clearnear (if same player is nearest).")
    else:
        player.say("levnear failed; check world permissions.")

player.on_chat("levnear", z5_levnear)

def z5_poisonnear():
    if not z5_has_other():
        player.say("No other player found. Nothing happened.")
    elif player.execute("effect @p[rm=0.1] poison 15 1 true"):
        player.say("poisoned nearest OTHER player. Stop: clearnear (if same player is nearest).")
    else:
        player.say("poisonnear failed; check world permissions.")

player.on_chat("poisonnear", z5_poisonnear)

def z5_clearnear():
    if not z5_has_other():
        player.say("No other player found. Nothing happened.")
    elif player.execute("effect @p[rm=0.1] clear"):
        player.say("cleared effects on nearest OTHER player. One-shot; no stop needed.")
    else:
        player.say("clearnear failed; check world permissions.")

player.on_chat("clearnear", z5_clearnear)

def z5_gapples():
    if player.execute("give @s golden_apple 64"):
        player.say("Given 64 golden_apple. One-shot; no stop needed.")
    else:
        player.say("golden_apple unavailable or inventory full.")

player.on_chat("gapples", z5_gapples)

def z5_egapples():
    if player.execute("give @s enchanted_golden_apple 8"):
        player.say("Given 8 enchanted_golden_apple. One-shot; no stop needed.")
    else:
        player.say("enchanted_golden_apple unavailable or inventory full.")

player.on_chat("egapples", z5_egapples)

def z5_pearls2():
    if player.execute("give @s ender_pearl 16"):
        player.say("Given 16 ender_pearl. One-shot; no stop needed.")
    else:
        player.say("ender_pearl unavailable or inventory full.")

player.on_chat("pearls2", z5_pearls2)

def z5_crystalstack():
    if player.execute("give @s end_crystal 64"):
        player.say("Given 64 end_crystal. One-shot; no stop needed.")
    else:
        player.say("end_crystal unavailable or inventory full.")

player.on_chat("crystalstack", z5_crystalstack)

def z5_totemstack():
    if player.execute("give @s totem_of_undying 16"):
        player.say("Given 16 totem_of_undying. One-shot; no stop needed.")
    else:
        player.say("totem_of_undying unavailable or inventory full.")

player.on_chat("totemstack", z5_totemstack)

def z5_anchorstack():
    if player.execute("give @s respawn_anchor 64"):
        player.say("Given 64 respawn_anchor. One-shot; no stop needed.")
    else:
        player.say("respawn_anchor unavailable or inventory full.")

player.on_chat("anchorstack", z5_anchorstack)

def z5_glowstack():
    if player.execute("give @s glowstone 64"):
        player.say("Given 64 glowstone. One-shot; no stop needed.")
    else:
        player.say("glowstone unavailable or inventory full.")

player.on_chat("glowstack", z5_glowstack)

def z5_obsistack():
    if player.execute("give @s obsidian 64"):
        player.say("Given 64 obsidian. One-shot; no stop needed.")
    else:
        player.say("obsidian unavailable or inventory full.")

player.on_chat("obsistack", z5_obsistack)

def z5_webstack():
    if player.execute("give @s cobweb 64"):
        player.say("Given 64 cobweb. One-shot; no stop needed.")
    else:
        player.say("cobweb unavailable or inventory full.")

player.on_chat("webstack", z5_webstack)

def z5_tntstack():
    if player.execute("give @s tnt 64"):
        player.say("Given 64 tnt. One-shot; no stop needed.")
    else:
        player.say("tnt unavailable or inventory full.")

player.on_chat("tntstack", z5_tntstack)

def z5_rockets():
    if player.execute("give @s firework_rocket 64"):
        player.say("Given 64 firework_rocket. One-shot; no stop needed.")
    else:
        player.say("firework_rocket unavailable or inventory full.")

player.on_chat("rockets", z5_rockets)

def z5_elytra():
    if player.execute("give @s elytra 1"):
        player.say("Given 1 elytra. One-shot; no stop needed.")
    else:
        player.say("elytra unavailable or inventory full.")

player.on_chat("elytra", z5_elytra)

def z5_trident():
    if player.execute("give @s trident 1"):
        player.say("Given 1 trident. One-shot; no stop needed.")
    else:
        player.say("trident unavailable or inventory full.")

player.on_chat("trident", z5_trident)

def z5_bow():
    if player.execute("give @s bow 1"):
        player.say("Given 1 bow. One-shot; no stop needed.")
    else:
        player.say("bow unavailable or inventory full.")

player.on_chat("bow", z5_bow)

def z5_crossbow():
    if player.execute("give @s crossbow 1"):
        player.say("Given 1 crossbow. One-shot; no stop needed.")
    else:
        player.say("crossbow unavailable or inventory full.")

player.on_chat("crossbow", z5_crossbow)

def z5_shielditem():
    if player.execute("give @s shield 1"):
        player.say("Given 1 shield. One-shot; no stop needed.")
    else:
        player.say("shield unavailable or inventory full.")

player.on_chat("shielditem", z5_shielditem)

def z5_arrowstack():
    if player.execute("give @s arrow 64"):
        player.say("Given 64 arrow. One-shot; no stop needed.")
    else:
        player.say("arrow unavailable or inventory full.")

player.on_chat("arrowstack", z5_arrowstack)

def z5_maceitem():
    if player.execute("give @s mace 1"):
        player.say("Given 1 mace. One-shot; no stop needed.")
    else:
        player.say("mace unavailable or inventory full.")

player.on_chat("maceitem", z5_maceitem)

def z5_windstack():
    if player.execute("give @s wind_charge 64"):
        player.say("Given 64 wind_charge. One-shot; no stop needed.")
    else:
        player.say("wind_charge unavailable or inventory full.")

player.on_chat("windstack", z5_windstack)

def z5_snowstack():
    if player.execute("give @s snowball 16"):
        player.say("Given 16 snowball. One-shot; no stop needed.")
    else:
        player.say("snowball unavailable or inventory full.")

player.on_chat("snowstack", z5_snowstack)

def z5_lava():
    if player.execute("give @s lava_bucket 1"):
        player.say("Given 1 lava_bucket. One-shot; no stop needed.")
    else:
        player.say("lava_bucket unavailable or inventory full.")

player.on_chat("lava", z5_lava)

def z5_water():
    if player.execute("give @s water_bucket 1"):
        player.say("Given 1 water_bucket. One-shot; no stop needed.")
    else:
        player.say("water_bucket unavailable or inventory full.")

player.on_chat("water", z5_water)

def z5_mobcow():
    if player.execute("summon cow ~ ~ ~5"):
        player.say("Spawned cow. One-shot; no stop needed.")
    else:
        player.say("Could not summon cow; check version/difficulty.")

player.on_chat("mobcow", z5_mobcow)

def z5_mobpig():
    if player.execute("summon pig ~ ~ ~5"):
        player.say("Spawned pig. One-shot; no stop needed.")
    else:
        player.say("Could not summon pig; check version/difficulty.")

player.on_chat("mobpig", z5_mobpig)

def z5_mobsheep():
    if player.execute("summon sheep ~ ~ ~5"):
        player.say("Spawned sheep. One-shot; no stop needed.")
    else:
        player.say("Could not summon sheep; check version/difficulty.")

player.on_chat("mobsheep", z5_mobsheep)

def z5_mobchicken():
    if player.execute("summon chicken ~ ~ ~5"):
        player.say("Spawned chicken. One-shot; no stop needed.")
    else:
        player.say("Could not summon chicken; check version/difficulty.")

player.on_chat("mobchicken", z5_mobchicken)

def z5_mobhorse():
    if player.execute("summon horse ~ ~ ~5"):
        player.say("Spawned horse. One-shot; no stop needed.")
    else:
        player.say("Could not summon horse; check version/difficulty.")

player.on_chat("mobhorse", z5_mobhorse)

def z5_mobwolf():
    if player.execute("summon wolf ~ ~ ~5"):
        player.say("Spawned wolf. One-shot; no stop needed.")
    else:
        player.say("Could not summon wolf; check version/difficulty.")

player.on_chat("mobwolf", z5_mobwolf)

def z5_mobcat():
    if player.execute("summon cat ~ ~ ~5"):
        player.say("Spawned cat. One-shot; no stop needed.")
    else:
        player.say("Could not summon cat; check version/difficulty.")

player.on_chat("mobcat", z5_mobcat)

def z5_mobrabbit():
    if player.execute("summon rabbit ~ ~ ~5"):
        player.say("Spawned rabbit. One-shot; no stop needed.")
    else:
        player.say("Could not summon rabbit; check version/difficulty.")

player.on_chat("mobrabbit", z5_mobrabbit)

def z5_mobvillager():
    if player.execute("summon villager ~ ~ ~5"):
        player.say("Spawned villager. One-shot; no stop needed.")
    else:
        player.say("Could not summon villager; check version/difficulty.")

player.on_chat("mobvillager", z5_mobvillager)

def z5_mobiron_golem():
    if player.execute("summon iron_golem ~ ~ ~5"):
        player.say("Spawned iron_golem. One-shot; no stop needed.")
    else:
        player.say("Could not summon iron_golem; check version/difficulty.")

player.on_chat("mobiron_golem", z5_mobiron_golem)

def z5_mobsnow_golem():
    if player.execute("summon snow_golem ~ ~ ~5"):
        player.say("Spawned snow_golem. One-shot; no stop needed.")
    else:
        player.say("Could not summon snow_golem; check version/difficulty.")

player.on_chat("mobsnow_golem", z5_mobsnow_golem)

def z5_mobbee():
    if player.execute("summon bee ~ ~ ~5"):
        player.say("Spawned bee. One-shot; no stop needed.")
    else:
        player.say("Could not summon bee; check version/difficulty.")

player.on_chat("mobbee", z5_mobbee)

def z5_mobfox():
    if player.execute("summon fox ~ ~ ~5"):
        player.say("Spawned fox. One-shot; no stop needed.")
    else:
        player.say("Could not summon fox; check version/difficulty.")

player.on_chat("mobfox", z5_mobfox)

def z5_mobturtle():
    if player.execute("summon turtle ~ ~ ~5"):
        player.say("Spawned turtle. One-shot; no stop needed.")
    else:
        player.say("Could not summon turtle; check version/difficulty.")

player.on_chat("mobturtle", z5_mobturtle)

def z5_mobzombie():
    if player.execute("summon zombie ~ ~ ~5"):
        player.say("Spawned zombie. One-shot; no stop needed.")
    else:
        player.say("Could not summon zombie; check version/difficulty.")

player.on_chat("mobzombie", z5_mobzombie)

def z5_mobskeleton():
    if player.execute("summon skeleton ~ ~ ~5"):
        player.say("Spawned skeleton. One-shot; no stop needed.")
    else:
        player.say("Could not summon skeleton; check version/difficulty.")

player.on_chat("mobskeleton", z5_mobskeleton)

def z5_mobcreeper():
    if player.execute("summon creeper ~ ~ ~5"):
        player.say("Spawned creeper. One-shot; no stop needed.")
    else:
        player.say("Could not summon creeper; check version/difficulty.")

player.on_chat("mobcreeper", z5_mobcreeper)

def z5_mobspider():
    if player.execute("summon spider ~ ~ ~5"):
        player.say("Spawned spider. One-shot; no stop needed.")
    else:
        player.say("Could not summon spider; check version/difficulty.")

player.on_chat("mobspider", z5_mobspider)

def z5_mobenderman():
    if player.execute("summon enderman ~ ~ ~5"):
        player.say("Spawned enderman. One-shot; no stop needed.")
    else:
        player.say("Could not summon enderman; check version/difficulty.")

player.on_chat("mobenderman", z5_mobenderman)

def z5_mobwitch():
    if player.execute("summon witch ~ ~ ~5"):
        player.say("Spawned witch. One-shot; no stop needed.")
    else:
        player.say("Could not summon witch; check version/difficulty.")

player.on_chat("mobwitch", z5_mobwitch)

def z5_day():
    if player.execute("time set 1000"):
        player.say("day set. One-shot; change with another world command.")
    else:
        player.say("day failed; check permissions.")

player.on_chat("day", z5_day)

def z5_noon():
    if player.execute("time set 6000"):
        player.say("noon set. One-shot; change with another world command.")
    else:
        player.say("noon failed; check permissions.")

player.on_chat("noon", z5_noon)

def z5_sunset():
    if player.execute("time set 12000"):
        player.say("sunset set. One-shot; change with another world command.")
    else:
        player.say("sunset failed; check permissions.")

player.on_chat("sunset", z5_sunset)

def z5_night():
    if player.execute("time set 13000"):
        player.say("night set. One-shot; change with another world command.")
    else:
        player.say("night failed; check permissions.")

player.on_chat("night", z5_night)

def z5_midnight():
    if player.execute("time set 18000"):
        player.say("midnight set. One-shot; change with another world command.")
    else:
        player.say("midnight failed; check permissions.")

player.on_chat("midnight", z5_midnight)

def z5_sunrise():
    if player.execute("time set 23000"):
        player.say("sunrise set. One-shot; change with another world command.")
    else:
        player.say("sunrise failed; check permissions.")

player.on_chat("sunrise", z5_sunrise)

def z5_clearweather():
    if player.execute("weather clear"):
        player.say("clearweather set. One-shot; change with another world command.")
    else:
        player.say("clearweather failed; check permissions.")

player.on_chat("clearweather", z5_clearweather)

def z5_rain():
    if player.execute("weather rain"):
        player.say("rain set. One-shot; change with another world command.")
    else:
        player.say("rain failed; check permissions.")

player.on_chat("rain", z5_rain)

def z5_thunder():
    if player.execute("weather thunder"):
        player.say("thunder set. One-shot; change with another world command.")
    else:
        player.say("thunder failed; check permissions.")

player.on_chat("thunder", z5_thunder)

def z5_peaceful():
    if player.execute("difficulty peaceful"):
        player.say("peaceful set. One-shot; change with another world command.")
    else:
        player.say("peaceful failed; check permissions.")

player.on_chat("peaceful", z5_peaceful)

def z5_easy():
    if player.execute("difficulty easy"):
        player.say("easy set. One-shot; change with another world command.")
    else:
        player.say("easy failed; check permissions.")

player.on_chat("easy", z5_easy)

def z5_hard():
    if player.execute("difficulty hard"):
        player.say("hard set. One-shot; change with another world command.")
    else:
        player.say("hard failed; check permissions.")

player.on_chat("hard", z5_hard)

def z5_safe_teleport(dx, dy, dz):
    destination = pos(dx, dy, dz)
    head = pos(dx, dy + 1, dz)
    if not blocks.test_for_block(AIR, destination):
        return False
    if not blocks.test_for_block(AIR, head):
        return False
    return player.teleport(destination)

def z5_up10():
    if z5_safe_teleport(0, 10, 0):
        player.say("up10: teleport complete. One-shot; no stop needed.")
    else:
        player.say("up10: destination blocked or teleport failed.")

player.on_chat("up10", z5_up10)

def z5_up30():
    if z5_safe_teleport(0, 30, 0):
        player.say("up30: teleport complete. One-shot; no stop needed.")
    else:
        player.say("up30: destination blocked or teleport failed.")

player.on_chat("up30", z5_up30)

def z5_down5():
    if z5_safe_teleport(0, -5, 0):
        player.say("down5: teleport complete. One-shot; no stop needed.")
    else:
        player.say("down5: destination blocked or teleport failed.")

player.on_chat("down5", z5_down5)

def z5_north20():
    if z5_safe_teleport(0, 0, -20):
        player.say("north20: teleport complete. One-shot; no stop needed.")
    else:
        player.say("north20: destination blocked or teleport failed.")

player.on_chat("north20", z5_north20)

def z5_south20():
    if z5_safe_teleport(0, 0, 20):
        player.say("south20: teleport complete. One-shot; no stop needed.")
    else:
        player.say("south20: destination blocked or teleport failed.")

player.on_chat("south20", z5_south20)

def z5_east20():
    if z5_safe_teleport(20, 0, 0):
        player.say("east20: teleport complete. One-shot; no stop needed.")
    else:
        player.say("east20: destination blocked or teleport failed.")

player.on_chat("east20", z5_east20)

def z5_west20():
    if z5_safe_teleport(-20, 0, 0):
        player.say("west20: teleport complete. One-shot; no stop needed.")
    else:
        player.say("west20: destination blocked or teleport failed.")

player.on_chat("west20", z5_west20)

def z5_backstep():
    destination = pos_camera(0, 0, -8)
    head = pos_camera(0, 1, -8)
    if blocks.test_for_block(AIR, destination) and blocks.test_for_block(AIR, head):
        if player.teleport(destination):
            player.say("Backstep complete. One-shot; no stop needed.")
        else:
            player.say("Backstep teleport failed.")
    else:
        player.say("Backstep destination blocked.")

player.on_chat("backstep", z5_backstep)

def z5_newhelp():
    player.say("=== ZENITH 5.0: 100 NEW COMMANDS ===")
    player.say("Use modeshelp, buffshelp, targetshelp")
    player.say("Use itemshelp, mobshelp, worldhelp")
    player.say("Use travelhelp for movement commands")
    player.say("Toggle commands tell you the stop word.")
    player.say("One-shot commands need no stop.")

player.on_chat("newhelp", z5_newhelp)

def z5_menu_buffs():
    player.say("--- BUFFS (15) ---")
    player.say("heal / feed / regenburst / absorbmax")
    player.say("speedmax / speedlite / jumpmax / jumplite")
    player.say("might / crit / mineboost / antifire")
    player.say("darkcloak / diver / tank")

player.on_chat("buffshelp", z5_menu_buffs)

def z5_menu_targets():
    player.say("--- TARGETS (11) ---")
    player.say("tpnear / killnear / bringnear / healnear")
    player.say("boostnear / slownear / blindnear / weakennear")
    player.say("levnear / poisonnear / clearnear")

player.on_chat("targetshelp", z5_menu_targets)

def z5_menu_items():
    player.say("--- ITEMS (22) ---")
    player.say("gapples / egapples / pearls2 / crystalstack")
    player.say("totemstack / anchorstack / glowstack / obsistack")
    player.say("webstack / tntstack / rockets / elytra")
    player.say("trident / bow / crossbow / shielditem")
    player.say("arrowstack / maceitem / windstack / snowstack")
    player.say("lava / water")

player.on_chat("itemshelp", z5_menu_items)

def z5_menu_mobs():
    player.say("--- MOBS (20) ---")
    player.say("mobcow / mobpig / mobsheep / mobchicken")
    player.say("mobhorse / mobwolf / mobcat / mobrabbit")
    player.say("mobvillager / mobiron_golem / mobsnow_golem / mobbee")
    player.say("mobfox / mobturtle / mobzombie / mobskeleton")
    player.say("mobcreeper / mobspider / mobenderman / mobwitch")

player.on_chat("mobshelp", z5_menu_mobs)

def z5_menu_world():
    player.say("--- WORLD (12) ---")
    player.say("day / noon / sunset / night")
    player.say("midnight / sunrise / clearweather / rain")
    player.say("thunder / peaceful / easy / hard")

player.on_chat("worldhelp", z5_menu_world)

def z5_menu_travel():
    player.say("--- TRAVEL (8) ---")
    player.say("up10 / up30 / down5 / north20")
    player.say("south20 / east20 / west20 / backstep")

player.on_chat("travelhelp", z5_menu_travel)

def z5_menu_modes():
    player.say("--- MODES (12) ---")
    player.say("invis / breath / absorb / hpboost")
    player.say("dolphin / conduit / keepinv / timelock")
    player.say("spawnlock / firesafe / weatherlock / griefguard")
    player.say("ON spells print their OFF command.")
    player.say("World rules affect the entire world.")

player.on_chat("modeshelp", z5_menu_modes)

