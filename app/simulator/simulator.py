from __future__ import annotations
import json

from app.simulator.general import *

def begin_simulation(honest_general: int,
         traitor_general: int,
         is_supreme_traitor: bool,
         order: int):
    """
        Supreme general di-exclude dari honest_general atau traitor_general
    """
    
    supreme_general = SupremeGeneral(0, is_supreme_traitor, list(), order)
    generals = []

    for i in range(1, honest_general+1):
        generals.append(General(i, False, list()))
    
    for i in range(honest_general+1, traitor_general+honest_general+1):
        generals.append(General(i, True, list()))

    
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
        "honestGeneral": honest_general,
        "traitorGeneral": traitor_general,
        "totalGeneral": honest_general + traitor_general + 1,
        "isSupremeTraitor": is_supreme_traitor,
        "order": order,
        "log": log, 
        "decidedAction": decided_action,
    }

    print(json.dumps(result, indent=3))
    return result


def main(num_general, num_faulty):
    return begin_simulation(3,0,True,0)

if __name__ == '__main__':
    main()