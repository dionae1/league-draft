import requests
import json

url = "https://ddragon.leagueoflegends.com/cdn/#version/data/en_US/champion.json"
image_url = (
    "https://ddragon.leagueoflegends.com/cdn/#version/img/champion/#champion.png"
)


class DataService:

    def __init__(self):
        self.version = self.get_version()
        self.check_local_data()
        self.data = self.load_local_data()
        self.formatted_data = self.get_data()

    def get_version(self):
        versions_url = "https://ddragon.leagueoflegends.com/api/versions.json"
        response = requests.get(versions_url)
        if response.status_code == 200:
            versions = response.json()
            return versions[0]
        else:
            response.raise_for_status()

    def format_image_url(self, champion: str, version: str) -> str:
        new_url = image_url.replace("#version", version)
        new_url = new_url.replace("#champion", champion)

        return new_url

    def fetch_data(self, url: str):
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()

    def update_local_content(self):
        latest_version = self.version
        assert latest_version is not None

        new_url = url.replace("#version", latest_version)
        data = self.fetch_data(new_url)

        assert data is not None

        self.create_formatted_content(data=data["data"])

        if data is None:
            raise Exception("Invalid data")

        print("Updated local content")
        with open("data_dragon/content.json", "wt") as f:
            json.dump(data, f, indent=4)

    def load_local_data(self):
        try:
            with open("data_dragon/content.json", "rt") as f:
                if f.readable():
                    return json.load(f)

        except (FileNotFoundError, json.JSONDecodeError):
            print("No local content found. Trying to update...")
            self.update_local_content()

            try:
                with open("data_dragon/content.json", "rt") as f:
                    if f.readable():
                        return json.load(f)

            except (FileNotFoundError, json.JSONDecodeError):
                return None

        return None

    def create_formatted_content(self, data: dict):
        new_data = {}
        latest_version = self.version
        assert latest_version is not None

        for champion in data:
            champion_url = self.format_image_url(
                champion=champion, version=latest_version
            )

            new_data.update()
            new_data[champion] = {}
            new_data[champion]["name"] = champion
            new_data[champion]["url"] = champion_url

        with open("data_dragon/formatted_content.json", "wt") as f:
            json.dump(new_data, f, indent=4)

    def check_local_data(self):
        local_data = self.load_local_data()

        if local_data is None:
            print("No local content found")
            self.update_local_content()
            local_data = self.load_local_data()

        if local_data is None:
            raise Exception("Could not load local content")

        version = self.version
        content_version = (
            local_data["version"] if local_data and "version" in local_data else None
        )

        if version != content_version:
            print("Outdated local content")
            self.update_local_content()
        else:
            print("Local content is uptodate!")

    def get_data(self) -> dict | None:
        try:
            with open("data_dragon/formatted_content.json", "rt") as f:
                if f.readable():
                    return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            print("No formatted content found. Trying to create it...")
            local_data = self.load_local_data()

            if local_data and "data" in local_data:
                self.create_formatted_content(data=local_data["data"])
                return self.get_data()
            return None
