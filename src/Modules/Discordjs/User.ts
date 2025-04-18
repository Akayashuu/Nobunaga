const SnowflakeRegex = /^[0-9]{17,19}$/;

class wUser {
	static isSnowflake(snowflake: string): boolean {
		return SnowflakeRegex.test(snowflake);
	}
}

export default wUser;
