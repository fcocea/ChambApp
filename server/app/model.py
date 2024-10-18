from typing import List
from uuid import UUID
from pydantic import BaseModel
from datetime import datetime

class Applicant(BaseModel):
    rut: str
    first_name: str
    last_name: str
    account_creation_date: str
    professions: List[str]
    areas: List[str]
    average_score_as_chamber: float

class AdvertisementResponse(BaseModel):
    advertisement_id: str
    advertisement_title: str
    advertisement_description: str
    advertisement_area_name: str
    applicants: List[Applicant]