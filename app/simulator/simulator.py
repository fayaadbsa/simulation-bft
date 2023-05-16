from __future__ import annotations
import json

from general import *

def begin_simulation(total_general: int,
         traitor_general: int,
         is_supreme_traitor: bool,
         order: int):
    """
        
    """
    generals = []
    supreme_general = SupremeGeneral(0, is_supreme_traitor, order)

    # Init honest_generals
    num_of_honest_general = total_general - traitor_general
    for i in range(1, num_of_honest_general + 1):
        generals.append(General(i, False))

    # Init traitor_generals
    if (is_supreme_traitor and traitor_general > 1):
        for i in range(num_of_honest_general + 1, num_of_honest_general + traitor_general):
            generals.append(General(i, True))
    elif (not is_supreme_traitor):
        for i in range(num_of_honest_general + 1, num_of_honest_general + traitor_general + 1):
            generals.append(General(i , True))


    # supreme_general = SupremeGeneral(0, is_supreme_traitor, list(), order)
    # generals = []
    

    # for i in range(1, honest_general+1):
    #     generals.append(General(i, False, list()))
    
    # for i in range(honest_general+1, traitor_general+honest_general+1):
    #     generals.append(General(i, True, list()))

    
    for general in generals:
        supreme_general.send_msg(general)

    for general_sender in generals:
        for general_receiver in generals:
            if (general_sender.id == general_receiver.id):
                continue
            else:
                order = general_sender.msg_log["supreme_general"]
                general_sender.send_msg(general_receiver, order)
    
    supreme_general.decide_action()
    for general in generals:
        general.decide_action()

    log = { f"general{general.id}": general.msg_log for general in generals }

    decided_action = {}
    decided_action["supremeGeneral"] = supreme_general.decision
    for general in generals:
        decided_action[f"general{general.id}"] = general.decision
    

    result = {
        "honestGeneral": num_of_honest_general,
        "traitorGeneral": traitor_general,
        "totalGeneral": total_general,
        "isSupremeTraitor": is_supreme_traitor,
        "order": order,
        "log": log, 
        "decidedAction": decided_action,
    }
    
    print(json.dumps(result, indent=3))
    return (json.dumps(result, indent=3))


def main():
    begin_simulation(10,2,True,1)

if __name__ == '__main__':
    main()

# if n_traitor > 0  && is_supremetraitor == True -> supreme_general include traitors && list_traitors
# elif n_traitor > 0 && is_supremetraitor == False -> supreme_general not in traitors $$ list_traitors
# else -> no traitors


