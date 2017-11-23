import React, { Component } from 'react';
import Movie from './Movie';

export default class App extends Component {
    state = {
        toggle: true
    }

    componentDidMount = () => {
        this._getMovies()
    }
    
    _getMovies = async () => {
        const movies = await this._callApi()
        this.setState({
            movies
        })
    }

    _callApi = () => {
        return fetch('https://yts.ag/api/v2/list_movies.json?sort_by=download_count')
            .then(response => response.json())
            .then(json => json.data.movies)
            .catch(error => console.error(error))
    }

    _renderMovies = () => {
        const movies = this.state.movies.map(movie => {
            return <Movie 
                title={movie.title}
                poster={movie.medium_cover_image}
                key={movie.id}
                year={movie.year}
                runtime={movie.runtime}
                rating={movie.rating}
                genres={movie.genres}
                summary={movie.summary}
                handleToggle={this._handleToggle}
                toggle={this.state.toggle}
            />
        })
        return movies
    }

    _handleToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
        console.log(this.state.toggle)
    }

    render() {
        const { movies } = this.state
        return (
            <div className="container">
                <header className="header">
                    <div>a</div>
                    <nav>b</nav>
                </header>
                <main className={ movies ? "main MovieList" : "Loading"}>
                    <section className="title">
                        <h1>Movie Cover</h1>
                    </section>
                    {movies ? this._renderMovies() : 'Loading'}
                </main>
            </div>
        )
    }
}