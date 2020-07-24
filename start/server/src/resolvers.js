
/**
 * Resolver signature:
 * fieldName: (parent, args, context, info) => data
 */
module.exports = {
  Query: {
    launches: (_, __, { dataSources }) => {
      console.log('resoliving this!!!', _)
      return dataSources.launchAPI.getAllLaunches()
    },
    launch: (_, { id }, { dataSources }) => {
      return dataSources.launchAPI.getLaunchById({ launchId: id })
    },
    me: (_, __, { dataSources }) => {
      return dataSources.userAPI.findOrCreateUser()
    }
  },
  Mission: {
    missionPatch: (mission, { size } = { size: 'LARGE' }) => {
      console.log(mission)
      return size === 'SMALL'
        ? mission.missionPatchSmall
        : mission.missionPatchLarge
    }
  },
  Launch: {
    isBooked: async (launch, _, { dataSources }) => {
      return dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id })
    },
    User: {
      trips: async (_, __, { dataSources }) => {
        const launchIds = await dataSources.userAPI.getLaunchIdsByUser()
        if (!launchIds.length) return []

        return dataSources.launchAPI.getLaunchesByIds({ launchIds }) || []
      }
    }
  }
}
