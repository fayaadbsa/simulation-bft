from django.shortcuts import render, redirect
from app.simulator.simulator import main

def index(request):
    data = {}
    return render(request, "index.html", data)

def result(request):
    num_general = request.GET.get("numGeneral")
    num_faulty = request.GET.get("numFaulty")
    is_supreme_traitor = request.GET.get("isSupremeTraitor")
    order = request.GET.get("order")
    
    print(num_general, num_faulty, is_supreme_traitor, order)
    if (num_general == None or num_faulty == None or is_supreme_traitor == None or order == None) :
        return redirect("index")
    result = main(num_general, num_faulty, is_supreme_traitor, order)
    return render(request, "result.html", result)
