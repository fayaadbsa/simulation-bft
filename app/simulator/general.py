from __future__ import annotations

class General:

    def __init__(self,
                 id: int,
                 is_traitor: bool):
        
        self.id = id
        self.is_traitor = is_traitor
        self.msg_log = dict()
        self.decision = None

    def send_msg(self, other_general: General, msg: int):
        
        if (self.is_traitor):
            if (msg == 1):
                other_general.msg_log[f"general_{self.id}"] = 0
            else:
                other_general.msg_log[f"general_{self.id}"] = 1
        
        else:
            other_general.msg_log[f"general_{self.id}"] = msg

    
    def decide_action(self):
        total_attack = 0
        total_retreat = 0
        for k,v in self.msg_log.items():
            if (v == 1):
                total_attack += 1
            else:
                total_retreat += 1

        if (self.is_traitor):
            self.decision = 0
        else:
            self.decision = 1 if total_attack > total_retreat else 0


class SupremeGeneral(General):

    def __init__(self,
                 id: int,
                 is_traitor: bool,
                 order: int):
        
        super().__init__(id, is_traitor)
        self.order = order
        self.decision = None

    
    def send_msg(self, other_general: General):
        if (self.is_traitor):
            if (other_general.id % 2 == 0):
                other_general.msg_log[f"supreme_general"] = 0
            else:
                other_general.msg_log[f"supreme_general"] = 1
        
        else:
            other_general.msg_log[f"supreme_general"] = self.order

    def decide_action(self):
        if (self.is_traitor):
            self.decision = 0
        else:
            self.decision = self.order