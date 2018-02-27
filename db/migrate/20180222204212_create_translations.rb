class CreateTranslations < ActiveRecord::Migration[5.1]
  def change
    create_table :translations do |t|
      t.string :language
      t.string :hello

      t.timestamps

    end
  end
end
