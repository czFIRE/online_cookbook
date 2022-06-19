import requests
import random
import uuid

nouns = [
    "Existence", "Eggs", "Sun", "Dinosaurs", "Value", "Alley", "Color", "Recipe", "Dock", "Kiss", "Homework", "Land", "Resource", "Quiver", "Record", "Situation", "Beginner", "Harmony", "Song", "Bucket"
]
adjectives = [
    "handy", "earthy", "therapeutic", "next", "southern", "normal", "stimulating", "separate", "glamorous", "boiling", "competitive", "brave", "uncovered", "abashed", "hulking", "tacky", "staking", "curious", "hypnotic", "shaky"
]

#api-endpoint
URL = "localhost:3003/recipe"

to_insert = 20

for i in range(to_insert):
    data = {
      'name': random.choice(adjectives) + " " + random.choice(nouns),
      'timeComplexity': random.randint(0, 50),
      'portions': i,
      'ingredients': random.choices(adjectives, k=1),
      #description: basicField[3].value,
      'steps': random.choices(nouns, k=1),
      'categoryId': "489c73f3-4fb0-45a0-a188-cd11a66cac1e",
      'userId': "f8fb2811-b24a-495e-aa5a-840ba5cb1a34",
    }

    resp = requests.post(url=URL, data=data)

    print(resp)