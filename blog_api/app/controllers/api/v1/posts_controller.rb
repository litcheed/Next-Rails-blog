class Api::V1::PostsController < ApplicationController
  def index
    # 期待するアクション：投稿すべて取得
    @posts = Post.all
    render json: @posts
  end

  def show
     # 期待するアクション：投稿の固有ページの取得
    @post = Post.find(params[:id])
    render json: @post
  end

  def create
    # 期待するアクション：投稿の作成
    @post = Post.new(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity # 422。リクエストはきているが意味的に間違っている
    end
  end

  def update
    # 期待するアクション：投稿の更新
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    # 期待するアクション：投稿の削除
    @post = Post.find(params[:id])
    @post.destroy 
  end


  private # 以下private

  def post_params
    params.require(:post).permit(:title, :content)
  end

end
