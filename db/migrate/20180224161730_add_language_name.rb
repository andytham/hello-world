class AddLanguageName < ActiveRecord::Migration[5.1]
  def change
    add_column :translations, :name, :string
  end
end
