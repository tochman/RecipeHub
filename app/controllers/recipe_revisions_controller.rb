class RecipeRevisionsController < ApplicationController
  def index
    @revisions = RecipeRevision.where(:recipe_id => Recipe.select(:id).find(params[:recipe_id]))
    @recipe_permalink = params[:recipe_id]
  end

  def show
    revision = RecipeRevision.find(params[:id])

    if revision.revision > 1
      previous_revision = RecipeRevision.where(:recipe_id => revision.recipe_id,
                                               :revision => revision.revision - 1).first

      @diff = Differ.diff_by_line(revision.body, previous_revision.body).format_as(:html).html_safe
    else
      @diff = "Not Available"
    end
  end
end
