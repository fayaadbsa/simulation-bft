from django.shortcuts import render
from app.bft import *

def index(request):
    data = {}
    return render(request, "index.html", data)

def result(request):
    num_general = request.GET.get("general")
    num_faulty = request.GET.get("faulty")
    generals = simulation(num_general, num_faulty)
    data = {"generals": generals}
    return render(request, "result.html", data)