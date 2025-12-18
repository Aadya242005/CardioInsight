# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Analysis Notebook & Report

- A Colab notebook `colab_heart_failure_analysis.ipynb` is included at the project root. Run it in Google Colab to reproduce the analysis, generate plots and a short insight report.
- The notebook outputs files in an `outputs/` folder (when run): `summary_chart.png`, `insight_report.md`, and other diagnostic plots.
- To update the website with real outputs:
	1. Run the notebook in Google Colab (open the `.ipynb` file and Run All). If you install SHAP in Colab, restart the runtime when prompted.
	2. Download `outputs/summary_chart.png` and `outputs/insight_report.md`.
	3. Place the chart in `public/assets/images/` (replace `summary_chart.svg`) and update `public/insight_report.html` or replace its content with the markdown-to-HTML conversion of `insight_report.md`.

Quick Colab install (optional) — run in Colab cell 1 if needed:
```python
!pip install -q shap plotly matplotlib seaborn joblib scikit-learn
```

Colab notebook (link): https://colab.research.google.com/drive/1jACyeDgfPhRlNVxUDrIUNJ3CjBuP4qRb?usp=sharing

## Submission Checklist

1. Run the analysis notebook in Google Colab: `colab_heart_failure_analysis.ipynb` and Run All.
2. Download `outputs/summary_chart.png` and `outputs/insight_report.md`.
3. Replace `public/assets/images/summary_chart.svg` with `summary_chart.png` (rename to `summary_chart.png`).
4. Convert `insight_report.md` to HTML (or paste contents into `public/insight_report.html`).
5. Run the site locally to verify:

```powershell
cd "C:\Users\Dell\Desktop\heart-failure-website\heart-failure-website"
npm install
npm run dev
```

6. Open `http://localhost:5173` (or the Vite URL) and verify the Analysis page and Report link.

If you want me to run the notebook and patch the real outputs into the site, reply `patch outputs` and I'll do it (I will need the notebook to run successfully in this environment or you can run in Colab and upload the generated files here).
