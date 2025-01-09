import { motion, AnimatePresence, delay, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getMovies, IGetMoviesResult } from 'src/api';
import { makeImagePath } from 'src/utils';
import styled from 'styled-components';

const Wrapper = styled.div`
	background-color: black;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	padding: 60px;
	justify-content: center;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
	background-size: cover;
`;

const Title = styled.h2`
	font-size: 68px;
	margin-bottom: 20px;
`;

const Overview = styled.p`
	font-size: 25px;
	width: 50%;
`;

const Slider = styled.div`
	position: relative;
	top: -100px;
`;

const Row = styled(motion.div)`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(6, 1fr);
	position: absolute;
	width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: center center;
	height: 200px;
	font-size: 50px;
	cursor: pointer;
	&:first-child {
		transform-origin: center left;
	}

	&:last-child {
		transform-origin: center right;
	}
`;

const Info = styled(motion.div)`
	padding: 10px;
	background-color: ${(props) => props.theme.black.lighter};
	opacity: 0;
	position: absolute;
	width: 100%;
	bottom: 0;
	h4 {
		text-align: center;
		font-size: 18px;
	}
`;

const rowVariants = {
	hidden: {
		x: window.innerWidth + 5
	},
	visible: {
		x: 0
	},
	exit: {
		x: -window.innerWidth - 5
	}
};

const boxVariants = {
	normal: {
		scale: 1
	},
	hover: {
		scale: 1.3,
		y: -80,
		transition: {
			delay: 0.2,
			duaration: 0.1,
			type: 'tween'
		}
	}
};

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.2,
			duaration: 0.1,
			type: 'tween'
		}
	}
};

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;

const BigMovie = styled(motion.div)`
	position: absolute;
	width: 30vw;
	height: 60vh;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 15px;
	overflow: hidden;
	background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
	width: 100%;
	background-size: cover;
	background-position: center center;
	height: 400px;
`;

const BigTitle = styled.h2`
	color: ${(props) => props.theme.white.lighter};
	padding: 20px;
	font-size: 46px;
	position: relative;
	top: -60px;
`;

const BigOverview = styled.p`
	padding: 20px;
	color: ${(props) => props.theme.white.lighter};
	position: relative;
	top: -60px;
`;

const offset = 6;

function Home() {
	const history = useHistory();
	const bigMovieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');
	const { scrollY } = useScroll();
	const { data, isLoading } = useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);
	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const incraseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = data.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const onBoxClicked = (movieId: number) => {
		history.push(`/movies/${movieId}`);
	};
	const onOverlayClick = () => history.push('/');
	const clickedMovie =
		bigMovieMatch?.params.movieId && data?.results.find((movie) => movie.id + '' === bigMovieMatch.params.movieId);
	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading ...</Loader>
			) : (
				<>
					<Banner onClick={incraseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
					<Slider>
						<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: 'tween', duration: 0.9 }}
								key={index}
							>
								{data?.results
									.slice(1)
									.slice(offset * index, offset * index + offset)
									.map((movie) => (
										<Box
											layoutId={movie.id + ''}
											key={movie.id}
											bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
											whileHover="hover"
											initial="nomal"
											transition={{ type: 'tween' }}
											variants={boxVariants}
											onClick={() => onBoxClicked(movie.id)}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
					<AnimatePresence>
						{bigMovieMatch ? (
							<>
								<Overlay onClick={onOverlayClick} animate={{ opacity: '1' }} exit={{ opacity: '0' }} />
								<BigMovie style={{ top: scrollY.get() + 100 }} layoutId={bigMovieMatch.params.movieId}>
									{clickedMovie && (
										<>
											<BigCover
												style={{
													backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
														clickedMovie.backdrop_path,
														'w500'
													)})`
												}}
											/>
											<BigTitle>{clickedMovie.title}</BigTitle>
											<BigOverview>{clickedMovie.overview}</BigOverview>
										</>
									)}
								</BigMovie>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
