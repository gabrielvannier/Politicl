import requests
from bs4 import BeautifulSoup
import csv

LEGISLATURE = 16

# URL of the Wikipedia page
urls = {
    16: "https://fr.wikipedia.org/wiki/Liste_des_d%C3%A9put%C3%A9s_de_la_XVIe_l%C3%A9gislature_de_la_Cinqui%C3%A8me_R%C3%A9publique"
}
# Send a GET request to the URL
url = urls[LEGISLATURE]
response = requests.get(url)
response.raise_for_status()  # Ensure we notice bad responses

# Parse the HTML content of the page
soup = BeautifulSoup(response.content, 'html.parser')

# Find the table(s) containing the deputies
tables = soup.find_all('table', class_='wikitable')

# Extract deputies' data
deputies_data = []
for table in tables:
    rows = table.find_all('tr')
    for row in rows[1:]:  # Skip the header row
        cells = row.find_all('td')
        if len(cells) > 8:  # Ensure it's a valid row
            name = cells[1].get_text(strip=True)
            birth_date = cells[3].get_text(strip=True)
            party = cells[8].get_text(strip=True)
            deputies_data.append([name, birth_date, party])

# Output to CSV format
csv_file_path = f'deputies_{str(LEGISLATURE)}.csv'
with open(csv_file_path, 'w', newline='', encoding='utf-8') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(['Name', 'Birth Date', 'Party'])
    writer.writerows(deputies_data)

print(f"Deputies data has been written to {csv_file_path}")
