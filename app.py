from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)  # Allow frontend requests

# ✅ Serve frontend UI
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
