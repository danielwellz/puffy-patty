import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiFetch } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Recipe } from "../types";

export function RecipesPage() {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (!token) return;
    apiFetch<Recipe[]>("/recipes", {}, token)
      .then(setRecipes)
      .catch(() => setRecipes([]));
  }, [token]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">{t("nav.recipes")}</p>
          <h1>{t("recipes.title")}</h1>
        </div>
      </div>
      <div className="cards two-col">
        {recipes.map((recipe) => (
          <article key={recipe.id} className="card">
            <h3>{recipe.name}</h3>
            <p className="pill ghost">
              {t("recipes.category")}: {recipe.category}
            </p>
            <ul className="recipe-list">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx}>
                  {ing.item} {ing.amount ?? ""} {ing.unit ?? ""}
                </li>
              ))}
            </ul>
            {recipe.notes && <p className="status info">{recipe.notes}</p>}
          </article>
        ))}
        {recipes.length === 0 && (
          <article className="card">
            <p className="status info">{t("status.loading")}</p>
          </article>
        )}
      </div>
    </div>
  );
}

export default RecipesPage;
