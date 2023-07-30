from flask import Flask, request, redirect
from flask_cors import CORS
import secrets

app = Flask(__name__)
cors = CORS(app)

# Dictionary to store URL mappings (Replace this with a database in production)
url_mappings = {}

@app.route('/api/shorten', methods=['POST'])
def shorten_url():
    data = request.get_json()
    long_url = data['longUrl']

    # Generate a short code (e.g., using secrets.token_urlsafe)
    short_code = secrets.token_urlsafe(5)

    # Store the mapping in the dictionary
    url_mappings[short_code] = long_url

    # Return the shortened URL
    return {'shortUrl': f'http://localhost:5000/{short_code}'}

@app.route('/<string:short_code>', methods=['GET'])
def redirect_to_long_url(short_code):
    # Retrieve the long URL from the dictionary
    long_url = url_mappings.get(short_code)

    if long_url:
        return redirect(long_url, code=302)
    else:
        return {'error': 'Short URL not found'}, 404

if __name__ == '__main__':
    app.run()