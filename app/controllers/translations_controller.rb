class TranslationsController < ApplicationController
  def index
    render json: Translation.all
  end
end
