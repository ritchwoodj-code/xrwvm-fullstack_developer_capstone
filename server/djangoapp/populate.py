from .models import CarMake, CarModel


def initiate():
    car_make_data = [
        {"name": "NISSAN", "description": "Great cars. Japanese technology"},
        {"name": "MERCEDES", "description": "Great cars. German technology"},
        {"name": "AUDI", "description": "Great cars. German technology"},
        {"name": "KIA", "description": "Great cars. Korean technology"},
        {"name": "TOYOTA", "description": "Great cars. Japanese technology"},
    ]

    car_make_instances = []
    for data in car_make_data:
        car_make_instances.append(
            CarMake.objects.create(
                name=data['name'],
                description=data['description'],
            ))

    car_model_data = [
        {"name": "Pathfinder", "type": "SUV",
            "year": 2023, "car_make_index": 0},
        {"name": "Qashqai", "type": "SUV", "year": 2023, "car_make_index": 0},
        {"name": "XTRAIL", "type": "SUV", "year": 2023, "car_make_index": 0},
        {"name": "A-Class", "type": "SUV",
            "year": 2023, "car_make_index": 1},
        {"name": "C-Class", "type": "SUV",
            "year": 2023, "car_make_index": 1},
        {"name": "E-Class", "type": "SUV",
            "year": 2023, "car_make_index": 1},
        {"name": "A4", "type": "SUV", "year": 2023, "car_make_index": 2},
        {"name": "A5", "type": "SUV", "year": 2023, "car_make_index": 2},
        {"name": "A6", "type": "SUV", "year": 2023, "car_make_index": 2},
        {"name": "Sorrento", "type": "SUV",
            "year": 2023, "car_make_index": 3},
        {"name": "Carnival", "type": "SUV",
            "year": 2023, "car_make_index": 3},
        {"name": "Cerato", "type": "SEDAN",
            "year": 2023, "car_make_index": 3},
        {"name": "Corolla", "type": "SEDAN",
            "year": 2023, "car_make_index": 4},
        {"name": "Camry", "type": "SEDAN",
            "year": 2023, "car_make_index": 4},
        {"name": "Kluger", "type": "SUV",
            "year": 2023, "car_make_index": 4},
    ]

    for data in car_model_data:
        CarModel.objects.create(
            name=data['name'],
            type=data['type'],
            year=data['year'],
            car_make=car_make_instances[data['car_make_index']],
        )
