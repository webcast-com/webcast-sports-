exports.handler = async (event) => {
  // Validate request method
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      },
      body: JSON.stringify({
        apiKey: process.env.data-key="8673444746a6314a40b74063b51be981",
        sport: 'football',
        lang: 'en',
        theme: 'grey',
        showError: false,
        showLogos: true,
        refresh: 20,
        favorite: true,
        playerTrophies: true,
        standings: true,
        playerInjuries: true,
        teamSquad: true,
        teamStatistics: true,
        playerStatistics: true
      })
    };
  } catch (error) {
    console.error('Error fetching config:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
