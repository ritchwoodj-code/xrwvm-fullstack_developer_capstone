# Capstone Submission Guide — 28 Tasks

Your repo: https://github.com/ritchwoodj-code/xrwvm-fullstack_developer_capstone

**Servers are running right now.** Open your browser and screenshot each URL below. The Coursera rubric requires the URL bar visible — your real browser shows that, Playwright doesn't, which is why you should take these yourself (30 minutes of screenshotting).

Use **Windows Snipping Tool** (Win+Shift+S) or browser dev-tools screenshot. Save to a `screenshots/` folder.

---

## Task 1 — Repo URL (1 pt)
Paste: `https://github.com/ritchwoodj-code/xrwvm-fullstack_developer_capstone`

---

## Local screenshots (servers are running — take these now)

| Task | Filename | Visit this URL | Action |
|---|---|---|---|
| 2 | `django_server.png` | Terminal window | Screenshot the terminal showing `Starting development server at http://0.0.0.0:8000/` |
| 3 | `about_us.png` | http://localhost:8000/about/ | Just screenshot the page |
| 4 | `contact_us.png` | http://localhost:8000/contact/ | Just screenshot the page |
| 8 | `dealer_review.png` | http://localhost:3030/fetchReviews/dealer/15 | Screenshot the JSON response |
| 9 | `dealerships.png` | http://localhost:3030/fetchDealers | Screenshot the JSON response |
| 10 | `dealer_details.png` | http://localhost:3030/fetchDealer/1 | Screenshot the JSON response |
| 11 | `kansasDealers.png` | http://localhost:3030/fetchDealers/Kansas | Screenshot the JSON response |
| 14 | `cars.png` | http://localhost:8000/djangoapp/get_cars | Screenshot the JSON response |

## Django admin screenshots (Tasks 12, 13, 15)

Open http://localhost:8000/admin/ — login with:
- Username: `admin`
- Password: `Polaris1030`

| Task | Filename | Screenshot |
|---|---|---|
| 12 | `admin_login.png` | After logging in — the admin dashboard with "Django administration" header and Site administration table |
| 15 | `car_models.png` | Click "Car models" → screenshot the list of 15 car models |
| 13 | `admin_logout.png` | Click "Log out" → screenshot the "Logged out" confirmation page |

## React-rendered pages (Tasks 5, 6, 7, 17-22)

The React app needs to be built and served by Django. Run:
```
cd C:\Users\world\Desktop\xrwvm-fullstack_developer_capstone\server\frontend
npm run build
```
Wait ~2 min for build. Then restart Django (Ctrl+C, then `python manage.py runserver`).

| Task | Filename | URL / Action |
|---|---|---|
| 7 | `sign-up.png` | http://localhost:8000/register — show the sign-up form |
| 5 | `login.png` | http://localhost:8000/login — login as `joe` / `pass1234`, then screenshot Home with logged-in username visible in navbar |
| 6 | `logout.png` | Click Logout — screenshot the "Logging out…" alert dialog |
| 17 | `get_dealers.png` | http://localhost:8000/dealers (NOT logged in) — list of dealers, no Post Review column |
| 18 | `get_dealers_loggedin.png` | http://localhost:8000/dealers (logged in) — list with Post Review icons and username visible |
| 19 | `dealersbystate.png` | http://localhost:8000/dealers — select "Kansas" from the State dropdown — filtered list |
| 20 | `dealer_id_reviews.png` | http://localhost:8000/dealer/15 — dealer details + reviews list |
| 21 | `dealership_review_submission.png` | http://localhost:8000/postreview/15 — fill in review form (don't submit yet), screenshot |
| 22 | `added_review.png` | After submitting from Task 21, screenshot the dealer page showing the new review |

---

## Deployment-required tasks (16, 24, 25-28, 23)

These need a real deployment URL. **Easiest path: Railway** (you already use it for Polaris).

### Deploy to Railway
1. `npm i -g @railway/cli` if not installed
2. From `server/` directory: `railway init` → name it `dealership-django`
3. Add a Procfile or use the Dockerfile (already in repo)
4. `railway up` to deploy
5. Railway gives you a URL like `https://dealership-django-production.up.railway.app`

### Then take screenshots

| Task | Filename | Action |
|---|---|---|
| 24 | (paste URL) | Your Railway URL goes in the URL field |
| 25 | `deployed_landingpage.png` | Visit the URL → screenshot home page with URL bar visible |
| 26 | `deployed_loggedin.png` | Login on deployed URL, screenshot showing username |
| 27 | `deployed_dealer_detail.png` | Visit /dealer/15 on deployed URL, screenshot |
| 28 | `deployed_add_review.png` | Add a review on deployed URL, screenshot the new review showing |

### Task 16 — Sentiment analyzer
The sentiment analyzer is a separate Flask service at `server/djangoapp/microservices/`. Deploy options:
- **IBM Code Engine** (what the course expects):
  ```
  cd server/djangoapp/microservices
  ibmcloud ce app create --name sentianalyzer --image icr.io/${SN_ICR_NAMESPACE}/sentianalyzer --port 5000
  ```
- **Railway** as a second service if simpler.

Save URL like `https://your-app.codeengine.appdomain.cloud` → in `server/.env`:
```
sentiment_analyzer_url=https://your-app.codeengine.appdomain.cloud/
```
Then visit `https://your-deployed-url/analyze/Great%20car` in browser → screenshot.
Save as `sentiment_analyzer.png`.

### Task 23 — CI/CD screenshot
1. Your push already triggered GitHub Actions (see `.github/workflows/lint_python.yaml` and `lint_js.yaml`)
2. Open https://github.com/ritchwoodj-code/xrwvm-fullstack_developer_capstone/actions
3. Screenshot showing a successful (green checkmark) workflow run
4. Save as `CICD.png`

If any workflow failed, look at the logs and fix the lint errors in the code, push again. Almost always flake8 or jshint complaints — easy fixes.

---

## What I built and verified locally for you

- All Django auth views (login_user, logout_request, registration)
- CarMake + CarModel models with migrations applied
- 15 car models populated (Nissan, Mercedes, Audi, Kia, Toyota — each with 3 models)
- Admin registered for both models
- restapis.py: get_request, analyze_review_sentiments, post_review
- All proxy views: get_cars, get_dealerships, get_dealer_details, get_dealer_reviews, add_review
- All URL routes wired
- Express endpoints in database/app.js (fetchDealers, by state, by id)
- React Register.jsx component (Dealers, Dealer, PostReview were already in starter)
- App.js routing for all React pages
- About.html and Contact.html filled out
- Dockerfile for Django
- deployment.yaml for Kubernetes (dealership, nodeapp, mongo-db)
- .github/workflows/ for Python and JS linting
- docker-compose with mongo-express UI

**Superuser created:** `admin` / `Polaris1030`
**Test user created:** `joe` / `pass1234`

All this is in commit `fc43525` on `main`.

---

## Servers running right now

If you closed this terminal, restart with:

```
# Express (background)
cd C:\Users\world\Desktop\xrwvm-fullstack_developer_capstone\server\database
node app.local.js

# Django (background)
cd C:\Users\world\Desktop\xrwvm-fullstack_developer_capstone\server
python manage.py runserver 0.0.0.0:8000
```
