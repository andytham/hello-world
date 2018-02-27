class CreateCountries < ActiveRecord::Migration[5.1]
  def change
    create_table :countries do |t|
      t.string :country
      t.string :name
      t.string :native
      t.string :phone
      t.string :continent
      t.string :capital
      t.string :currency
      t.string :languages

      t.timestamps
    end
  end
end
