import { SectionList, Text, View } from 'react-native';

export default function ContactsScreen() {
  const sections = [
    { title: 'A', data: ['Andriy', 'Anna'] },
    { title: 'B', data: ['Bohdan', 'Boris'] },
  ];

  return (
      <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Text style={{ padding: 10 }}>{item}</Text>}
          renderSectionHeader={({ section }) => (
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{section.title}</Text>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      />
  );
}