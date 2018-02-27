class AddCountryCodes < ActiveRecord::Migration[5.1]
  def change
    add_column :countries, :country_code_two, :string
  end
end
