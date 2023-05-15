from django.shortcuts import render
from app.bft import *
from app.simulator.simulator import main

def index(request):
    data = {}
    return render(request, "index.html", data)

def result(request):
    num_general = request.GET.get("general")
    num_faulty = request.GET.get("faulty")
    result = main(num_general, num_faulty)
    return render(request, "result.html", result)
