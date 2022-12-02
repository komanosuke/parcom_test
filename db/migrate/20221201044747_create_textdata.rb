class CreateTextdata < ActiveRecord::Migration[6.1]
  def change
    create_table :textdata do |t|
      t.text :string

      t.timestamps
    end
  end
end
