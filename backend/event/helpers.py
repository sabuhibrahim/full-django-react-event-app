import os
from datetime import datetime

symbols_mapping = [
    (" ", "-"),
    (".", "."),
    (",", "-"),
    ("!", "-"),
    ("?", "-"),
    ("'", "-"),
    ('"', "-"),
]

lower_case_mapping = [
    ("ə", "e"),
    ("ı", "i"),
    ("ö", "o"),
    ("ğ", "g"),
    ("ü", "u"),
    ("ş", "s"),
    ("ç", "c"),
]

upper_case_mapping = [
    ("Ə", "E"),
    ("İ", "I"),
    ("Ö", "O"),
    ("Ğ", "G"),
    ("Ü", "U"),
    ("Ş", "S"),
    ("Ç", "C"),
]


def slugify(text: str) -> str:
    mapping: list = symbols_mapping + lower_case_mapping
    text = text.lower()

    for before, after in mapping:
        text = text.replace(before, after)

    return text


def generate_file_path(base: str, filename: str) -> str:
    today = datetime.today()
    name, extension = os.path.splitext(filename)
    return f"{base}/{today.year}/{today.month}/{slugify(name)}{extension}"


def get_club_path(instance, filename: str) -> str:
    return generate_file_path("clubs", filename)


def get_event_path(instance, filename: str) -> str:
    return generate_file_path("events", filename=filename)
