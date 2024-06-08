from fastapi.testclient import TestClient

from ...main import app
from ...models.salesperson import Salesperson


client = TestClient(app)

def test_create_salesperson() -> None:
    test_salesperson = {
    "address": {
        "address": "123 Main St",
        "address2": "Apt 101",
        "city": "Springfield",
        "country": "USA",
        "id_address": "billing",
        "state": "IL",
        "zip_code": "62701"
    },
    "bloqued": False,
    "commission": 5,
    "email": "example@mail.com",
    "id_employee": 1,
    "name": "John Doe",
    "name2": "John",
    "phone": "217-555-1234"
    }
    response = client.put("/salesperson/", json=test_salesperson)
    assert response.status_code == 201
    assert response.json() == test_salesperson
