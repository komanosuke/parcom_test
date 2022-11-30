Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/', to: 'connect#index'
  get 'connect', to: 'connect#index'
  get 'connect/index'

  get 'connect/post_message'
end
