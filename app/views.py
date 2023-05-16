from django.shortcuts import render, redirect
from app.simulator.simulator import main

def index(request):
    data = {}
    return render(request, "landingPage.html", data)

def result(request):
    num_general = request.GET.get("nodecount")
    num_faulty = request.GET.get("fnodecount")
    is_supreme_traitor = request.GET.get("issupremetraitor")
    order = request.GET.get("order")
    print(num_general, num_faulty, is_supreme_traitor, order)

    if (num_general == None or num_faulty == None or order == None) :
        return redirect("index")
    
    num_general = int(num_general)
    num_faulty = int(num_faulty)
    is_supreme_traitor = True if is_supreme_traitor == "true" else False
    order = 1 if order == "attack" else 0

    result = main(num_general, num_faulty, is_supreme_traitor, order)
    return render(request, "simulationPage.html", result)
