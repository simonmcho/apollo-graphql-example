const { RESTDataSource } = require('apollo-datasource-rest')

// This class automatically caches response from REST resources with no additional setup
// It is called partial query caching - https://www.apollographql.com/blog/easy-and-performant-graphql-over-rest-e02796993b2b
class LaunchAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.spacexdata.com/v2/'
  }

  launchReducer(launch) {
    const {
      flight_number,
      launch_date_unix,
      launch_site,
      mission_name,
      links,
      rocket
    } = launch
    const { site_name } = launch_site
    const { mission_patch_small, mission_patch } = links
    const { rocket_id, rocket_name, rocket_type } = rocket
    const mission = {
      name: mission_name,
      missionPatchSmall: mission_patch_small,
      missionPatchLarge: mission_patch
    }
    const rocketData = {
      id: rocket_id,
      name: rocket_name,
      type: rocket_type
    }

    return {
      id: flight_number || 0,
      cursor: `${launch_date_unix}`,
      site: launch_site && site_name,
      mission,
      rocket: rocketData
    }
  }

  async getAllLaunches() {
    const response = await this.get('launches')
    return Array.isArray(response)
      ? response.map((launch) => this.launchReducer(launch))
      : []
  }

  async getLaunchById({ launchId }) {
    const response = await this.get('launches', { flight_number: launchId })
    return this.launchReducer(response[0])
  }

  getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map((launchId) => this.getLaynchById({ launchId }))
    )
  }
}

module.exports = LaunchAPI
