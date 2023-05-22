from __future__ import annotations
import json

from app.simulator.general import *

def begin_simulation(total_general: int,
         traitor_general: int,
         is_supreme_traitor: bool,
         order: int):
    """
        
    """
    generals = []
    supreme_general = SupremeGeneral(0, is_supreme_traitor, order)

    # Init traitor generals
    if (is_supreme_traitor and traitor_general > 1):
        for i in range(1, traitor_general + 1):
            generals.append(General(i, True))
    elif (is_supreme_traitor and traitor_general == 1):
        pass
    elif (not is_supreme_traitor):
        for i in range(1, traitor_general + 1):
            generals.append(General(i , True))

    # Init honest_generals
    num_of_honest_general = total_general - traitor_general
    if (is_supreme_traitor):
        for i in range(traitor_general, traitor_general + num_of_honest_general):
            generals.append(General(i, False))
    else:
        for i in range(traitor_general + 1, traitor_general + num_of_honest_general):
            generals.append(General(i, False))

    
    for general in generals:
        supreme_general.send_msg(general)

    for general_sender in generals:
        for general_receiver in generals:
            if (general_sender.id == general_receiver.id):
                continue
            else:
                order = general_sender.receive_log["supreme_general"]
                general_sender.send_msg(general_receiver, order)
    
    supreme_general.decide_action()
    for general in generals:
        general.decide_action()

    send_log = dict()
    send_log["supreme_general"] = supreme_general.send_log
    for general in generals:
        send_log[f"general_{general.id}"] = general.send_log


    receive_log = { f"general_{general.id}": general.receive_log for general in generals }
    for general in generals:
        decided_value = general.decide_action()
        receive_log[f"general_{general.id}"]["attack_count"] = decided_value["attack_count"]
        receive_log[f"general_{general.id}"]["retreat_count"] = decided_value["retreat_count"]


    decided_action = {}
    decided_action["supreme_general"] = supreme_general.decision
    for general in generals:
        decided_action[f"general_{general.id}"] = general.decision
    

    result = {
        "honest_general": num_of_honest_general,
        "traitor_general": traitor_general,
        "total_general": total_general,
        "is_supreme_traitor": is_supreme_traitor,
        "order": order,
        "log": receive_log, 
        "decided_action": decided_action,
    }
    
    print(json.dumps(result, indent=3))
    return result


def main(num_general, num_faulty, is_supreme_traitor, order):
    return begin_simulation(num_general, num_faulty, is_supreme_traitor, order)

if __name__ == '__main__':
    main()

# if n_traitor > 0  && is_supremetraitor == True -> supreme_general include traitors && list_traitors
# elif n_traitor > 0 && is_supremetraitor == False -> supreme_general not in traitors $$ list_traitors
# else -> no traitors


